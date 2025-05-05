import { useState, useEffect, createContext, useMemo } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import Traveler from './Traveler';
import { OAuthResponse, TypeDefinition } from './type-definitions/additons';
import React from 'react';
import { BungieMembershipType, ServerResponse } from './type-definitions/common';
import { DestinyComponentType, DestinyInventoryItemDefinition, DestinyItemComponent, DestinyProfileResponse } from './type-definitions/destiny2';
import { UserMembershipData } from './type-definitions/user';
import Dashboard from './components/UI/Main/Dashboard.component';
import Manifest from '../server/Manifest'


// Define bucket hashes for clarity and maintainability
const BUCKET_HASHES = {
  KINETIC_WEAPON: 1498876634,
  ENERGY_WEAPON: 2465295065,
  POWER_WEAPON: 953998645,
  GHOST: 4023194814,
  HELMET: 3448274439,
  GAUNTLETS: 3551918588,
  CHEST_ARMOR: 14239492,
  LEG_ARMOR: 20886954,
  CLASS_ARMOR: 1585787867,
  EXOTIC_TIER: 2759499571,
  LEGENDARY_TIER: 4008398120,

};

// Combine weapon and armor buckets for easier categorization
const WEAPON_BUCKET_HASHES = [
  BUCKET_HASHES.KINETIC_WEAPON,
  BUCKET_HASHES.ENERGY_WEAPON,
  BUCKET_HASHES.POWER_WEAPON,
  BUCKET_HASHES.GHOST
];

const ARMOR_BUCKET_HASHES = [
  BUCKET_HASHES.HELMET,
  BUCKET_HASHES.GAUNTLETS,
  BUCKET_HASHES.CHEST_ARMOR,
  BUCKET_HASHES.LEG_ARMOR,
  BUCKET_HASHES.CLASS_ARMOR,
];

// --- Context Type Definition ---
export type contextType = {
  bungieMembershipData: ServerResponse<UserMembershipData> | undefined;
  userCharacterProfiles: ServerResponse<DestinyProfileResponse> | undefined;
  userWeapons: DestinyInventoryItemDefinition[][];
  userArmor: DestinyInventoryItemDefinition[][];
}

// --- Context Initialization ---
const defaultContextValue: contextType = {
  bungieMembershipData: undefined,
  userCharacterProfiles: undefined,
  userWeapons: [],
  userArmor: [],
};
export const BungieMembershipDataContext = createContext<contextType>(defaultContextValue);
export const OAuthURLEndpointContext = createContext<string>("");

// --- App Component ---
function App() {

  // --- Traveler Initialization ---
  const traveler = useMemo(() => new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
    userAgent: 'YourAppName/Version'
  }), []);

  // --- Manifest Initialization ---

  const manifest = useMemo(() => new Manifest(import.meta.env.VITE_MANIFEST_FILE_PATH), []);
  console.log("Manifest path working:", manifest.manifestCheck());
  

  const oauth_url_endpoint = useMemo(() =>
    traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID)
    , [traveler]);

  // --- State Definitions ---
  const [oauthServerResponse, setOauthServerResponse] = useState<OAuthResponse>();
  const [bungieMembershipData, setBungieMembershipData] = useState<ServerResponse<UserMembershipData>>();
  const [userCharacterProfiles, setUserCharacterProfiles] = useState<ServerResponse<DestinyProfileResponse>>();

  // State to hold all unique fetched item definitions for equipped items for all characters
  const [allUniqueEquippedItemDefinitions, setAllUniqueEquippedItemDefinitions] = useState<DestinyInventoryItemDefinition[]>([]);

  // Final categorized state - Array per character
  const [userWeapons, setUserWeapons] = useState<DestinyInventoryItemDefinition[][]>([]);
  const [userArmor, setUserArmor] = useState<DestinyInventoryItemDefinition[][]>([]);


  // 1. Check for OAuth Code 
  useEffect(() => {
    const authorizationCodeChecker = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        try {
          const oAuthResponse = await traveler.oauth.getAccessToken(
            code,
            import.meta.env.VITE_BUNGIE_CLIENT_ID,
            import.meta.env.VITE_BUNGIE_CLIENT_SECRET // SECURITY WARNING for production
          );
          setOauthServerResponse(oAuthResponse);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      } else {
        console.log("No authorization code found in URL.");
      }
    };
    authorizationCodeChecker();
  }, [traveler]);

  // 2. Get Bungie Membership Data 
  useEffect(() => {
    const getBungieMembershipData = async () => {
      if (oauthServerResponse?.access_token) {
        console.log("Fetching Bungie membership data...");
        try {
          const tempBungieUserDataObject = await traveler.user.getMembershipDataForCurrentUser(oauthServerResponse.access_token);
          setBungieMembershipData(tempBungieUserDataObject);
        } catch (error) {
          console.error("Error fetching Bungie membership data:", error);
        }
      }
    };
    getBungieMembershipData();
  }, [oauthServerResponse, traveler]);


  //2b. Fetch Manifest

  // useEffect(()=>{
  //   console.log("Attempting to query the manifest");
  //   manifest.queryManifest("SELECT json FROM DestinyRaceDefinition WHERE id = -1491684358;").then((response)=>{
  //     console.log("Manifest response:", response);
  //   }
  //   ).catch((error)=>{
  //     console.error("Error fetching manifest data:", error);
  //   }
  //   )
  // }, [manifest]);


  



  // 3. Get Character Profiles
  useEffect(() => {
    const getUserProfileInformation = async () => {
      if (bungieMembershipData?.Response?.destinyMemberships?.length && oauthServerResponse?.access_token) {
        const primaryMembership = bungieMembershipData.Response.destinyMemberships.find(m => m.membershipType === BungieMembershipType.TigerXbox)
          || bungieMembershipData.Response.destinyMemberships[0];

        if (!primaryMembership) {
          console.error("No suitable Destiny membership found.");
          return;
        }

        console.log(`Workspaceing profile for membership type ${primaryMembership.membershipType}, ID ${primaryMembership.membershipId}`);
        const components = [
          DestinyComponentType.Characters,
          DestinyComponentType.CharacterEquipment

        ];

        try {
          const tempBungieCharacterProfileDataObject = await traveler.destiny2.getProfile(
            primaryMembership.membershipType,
            primaryMembership.membershipId,
            { components },
            oauthServerResponse.access_token
          );
          setUserCharacterProfiles(tempBungieCharacterProfileDataObject);
          console.log("User Character Profiles:", tempBungieCharacterProfileDataObject);
        } catch (error) {
          console.error("Error fetching user profile information:", error);
        }
      }
    };
    getUserProfileInformation();
  }, [bungieMembershipData, oauthServerResponse, traveler]);

  // 4. Fetch ALL Unique Equipped Item Definitions when Profiles are loaded
  useEffect(() => {
    const fetchItemDefinitions = async () => {
      const equipmentData = userCharacterProfiles?.Response?.characterEquipment?.data;
      if (equipmentData) {
        const characterIds = Object.keys(equipmentData);

        if (characterIds.length === 0) {
          console.log("No characters found in profile equipment data.");
          setAllUniqueEquippedItemDefinitions([]); // Clear previous definitions
          return;
        }

        console.log("Gathering equipped item hashes for all characters...");

        // Collect hashes from all characters
        const allEquippedItems: DestinyItemComponent[] = characterIds.flatMap(id => equipmentData[id]?.items || []);

        if (allEquippedItems.length === 0) {
          console.log("No equipped items found across all characters.");
          setAllUniqueEquippedItemDefinitions([]);
          return;
        }

        // Create a unique set of item hashes to avoid redundant fetches
        const uniqueItemHashes = [...new Set(allEquippedItems.map(item => item.itemHash.toString()))];

        // Create an array of promises for fetching each definition
        const definitionPromises = uniqueItemHashes.map(hash =>
          traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, hash)
            .then(response => response.Response)
            .catch(error => {
              console.error(`Error fetching definition for item hash ${hash}:`, error);
              return null;
            })
        );

        // Wait for all promises to resolve
        console.log("Fetching definitions...");
        const resolvedDefinitions = await Promise.all(definitionPromises);

        // Filter out any null results (due to errors) and ensure type safety
        const validDefinitions = resolvedDefinitions.filter(
          (def): def is DestinyInventoryItemDefinition => def !== null
        );

        console.log(`Successfully fetched ${validDefinitions.length} definitions.`);
        setAllUniqueEquippedItemDefinitions(validDefinitions);
      } else {
        // Reset if profile data is not available
        setAllUniqueEquippedItemDefinitions([]);
      }
    };

    fetchItemDefinitions();

  }, [userCharacterProfiles, traveler]);


  // 5. Filter Definitions into Weapons and Armor per character
  useEffect(() => {
    // Wait for both profiles (to know *which* items each character has)
    // AND the definitions (to know *what* those items are)
    if (userCharacterProfiles?.Response?.characterEquipment?.data && allUniqueEquippedItemDefinitions.length > 0) {

      console.log("Structuring fetched definitions into weapons and armor per character...");

      const equipmentData = userCharacterProfiles.Response.characterEquipment.data;
      const characterIds = Object.keys(equipmentData);

      // Create a lookup map for quick access to definitions by hash
      const definitionsMap: { [hash: string]: DestinyInventoryItemDefinition } = {};
      allUniqueEquippedItemDefinitions.forEach(def => {
        definitionsMap[def.hash.toString()] = def;
      });

      const weaponsByCharacter: DestinyInventoryItemDefinition[][] = [];
      const armorByCharacter: DestinyInventoryItemDefinition[][] = [];

      // Iterate through each character
      characterIds.forEach(charId => {
        const equippedItems = equipmentData[charId]?.items || [];
        const currentCharWeapons: DestinyInventoryItemDefinition[] = [];
        const currentCharArmor: DestinyInventoryItemDefinition[] = [];

        // Iterate through items equipped by this specific character
        equippedItems.forEach(item => {
          const definition = definitionsMap[item.itemHash.toString()];
          if (definition) {
            const bucketHash = definition.inventory?.bucketTypeHash;
            if (bucketHash) {
              if (WEAPON_BUCKET_HASHES.includes(bucketHash)) {
                currentCharWeapons.push(definition);
              } else if (ARMOR_BUCKET_HASHES.includes(bucketHash)) {
                currentCharArmor.push(definition);
              }
            } else {
              console.warn("Definition missing inventory.bucketTypeHash:", definition.displayProperties.name, definition.hash);
            }
          } else {
            // This might happen if a definition failed to fetch in the previous step
            console.warn(`Definition not found for item hash ${item.itemHash} on character ${charId}`);
          }
        });

        // Sort items within categories for this character
        const weaponSortOrder = [
          BUCKET_HASHES.KINETIC_WEAPON, BUCKET_HASHES.ENERGY_WEAPON, BUCKET_HASHES.POWER_WEAPON, BUCKET_HASHES.GHOST
        ];
        currentCharWeapons.sort((a, b) => {
          const indexA = weaponSortOrder.indexOf(a.inventory.bucketTypeHash);
          const indexB = weaponSortOrder.indexOf(b.inventory.bucketTypeHash);
          return indexA - indexB;
        });

        const armorSortOrder = [
          BUCKET_HASHES.HELMET, BUCKET_HASHES.GAUNTLETS, BUCKET_HASHES.CHEST_ARMOR, BUCKET_HASHES.LEG_ARMOR, BUCKET_HASHES.CLASS_ARMOR
        ];
        currentCharArmor.sort((a, b) => {
          const indexA = armorSortOrder.indexOf(a.inventory.bucketTypeHash);
          const indexB = armorSortOrder.indexOf(b.inventory.bucketTypeHash);
          return indexA - indexB;
        });

        // Add this character's sorted lists to the main arrays
        weaponsByCharacter.push(currentCharWeapons);
        armorByCharacter.push(currentCharArmor);
      });


      // Set state once with the final, structured arrays
      setUserWeapons(weaponsByCharacter);
      setUserArmor(armorByCharacter);
      console.log("Finished structuring items per character.", { weaponsByCharacter, armorByCharacter });

    } else {
      // Reset if dependencies are not ready
      setUserWeapons([]);
      setUserArmor([]);
    }
  }, [userCharacterProfiles, allUniqueEquippedItemDefinitions]);


  // --- Prepare Context Value ---
  // Ensure the value passed matches the contextType
  const contextValue = useMemo(() => ({
    bungieMembershipData,
    userCharacterProfiles,
    userWeapons,
    userArmor
  }), [bungieMembershipData, userCharacterProfiles, userWeapons, userArmor]);


  return (
    <React.Fragment>
      <BrowserRouter>
        <BungieMembershipDataContext.Provider value={contextValue}>
          <OAuthURLEndpointContext.Provider value={oauth_url_endpoint}>

            <Dashboard />

            {/* Example conditional rendering or loading state */}
            {/* {!contextValue.userCharacterProfiles || (contextValue.userWeapons.length === 0 && contextValue.userArmor.length === 0) ? (
                 <div>Loading Guardian Data...</div>
            ) : (
                 <Dashboard />
            )} */}

          </OAuthURLEndpointContext.Provider>
        </BungieMembershipDataContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;