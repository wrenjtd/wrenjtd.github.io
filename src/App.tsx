import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import Traveler from './Traveler';
import { OAuthResponse, TypeDefinition } from './type-definitions/additons';
import React from 'react';
import { BungieMembershipType, ServerResponse } from './type-definitions/common';
import { DestinyComponentType, DestinyInventoryItemDefinition, DestinyProfileResponse } from './type-definitions/destiny2';
import { UserMembershipData } from './type-definitions/user';
import Dashboard from './components/UI/Main/Dashboard.component';

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
    // Add other relevant bucket hashes if needed
};

// Combine weapon and armor buckets for easier categorization
const WEAPON_BUCKET_HASHES = [
    BUCKET_HASHES.KINETIC_WEAPON,
    BUCKET_HASHES.ENERGY_WEAPON,
    BUCKET_HASHES.POWER_WEAPON,
    BUCKET_HASHES.GHOST // Ghost is often considered utility/weapon slot adjacent
];

const ARMOR_BUCKET_HASHES = [
    BUCKET_HASHES.HELMET,
    BUCKET_HASHES.GAUNTLETS,
    BUCKET_HASHES.CHEST_ARMOR,
    BUCKET_HASHES.LEG_ARMOR,
    BUCKET_HASHES.CLASS_ARMOR,
];


// --- Context Type Definition ---
// Note: If you store the definitions directly, you might not need ServerResponse wrapper here
export type contextType = {
  bungieMembershipData: ServerResponse<UserMembershipData> | undefined; // Allow undefined initial state
  userCharacterProfiles: ServerResponse<DestinyProfileResponse> | undefined; // Allow undefined initial state
  // Store the actual definitions, not the wrapped ServerResponse
  userWeapons: DestinyInventoryItemDefinition[]; 
  userArmor: DestinyInventoryItemDefinition[];
}

// --- Context Initialization ---
// Provide a default value that matches the contextType structure
const defaultContextValue: contextType = {
    bungieMembershipData: undefined,
    userCharacterProfiles: undefined,
    userWeapons: [],
    userArmor: [],
};
export const BungieMembershipDataContext = createContext<contextType>(defaultContextValue);
export const OAuthURLEndpointContext = createContext<string>(""); // Default can be empty string

// --- App Component ---
function App() {

  // --- Traveler Initialization ---
  const traveler = React.useMemo(() => new Traveler({ // Use useMemo to avoid recreating on every render
    apikey: import.meta.env.VITE_BUNGIE_API_KEY,
    debug: true, // Consider setting to false in production
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
    userAgent: 'YourAppName/Version' // Provide a user agent
  }), []); // Empty dependency array means it's created once

  const oauth_url_endpoint = React.useMemo(() => 
      traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID)
  , [traveler]); // Regenerate if traveler changes (though it won't here)

  // --- State Definitions ---
  const [oauthServerResponse, setOauthServerResponse] = useState<OAuthResponse>();
  const [bungieMembershipData, setBungieMembershipData] = useState<ServerResponse<UserMembershipData>>();
  const [userCharacterProfiles, setUserCharacterProfiles] = useState<ServerResponse<DestinyProfileResponse>>();
  
  // State to hold ALL fetched item definitions for equipped items
  const [userCharacterEquipmentDefinitions, setuserCharacterEquipmentDefinitions] = useState<DestinyInventoryItemDefinition[]>([]);

  // Final categorized state
  const [userWeapons, setUserWeapons] = useState<DestinyInventoryItemDefinition[]>([]);
  const [userArmor, setUserArmor] = useState<DestinyInventoryItemDefinition[]>([]);

  // --- Effects ---

  // 1. Check for OAuth Code
  useEffect(() => {
    const authorizationCodeChecker = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        console.log("Authorization code found:", code);
        try {
          // Important: Avoid exposing client secret directly in frontend code for production apps.
          // Usually, the token exchange happens on a backend server.
          // For local dev or specific use cases, this might be acceptable, but be aware of security risks.
          const oAuthResponse = await traveler.oauth.getAccessToken(
              code, 
              import.meta.env.VITE_BUNGIE_CLIENT_ID, 
              import.meta.env.VITE_BUNGIE_CLIENT_SECRET // SECURITY WARNING for production
          );
          setOauthServerResponse(oAuthResponse);
          console.log("OAuth Response:", oAuthResponse);
          // Clean the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
            console.error("Error getting access token:", error);
            // Handle token exchange error (e.g., show message to user)
        }
      } else {
          console.log("No authorization code found in URL.");
      }
    };

    authorizationCodeChecker();
  }, [traveler]); // Add traveler dependency

  // 2. Get Bungie Membership Data when OAuth is successful
  useEffect(() => {
    const getBungieMembershipData = async () => {
      if (oauthServerResponse?.access_token) { // Check for access_token
        console.log("Fetching Bungie membership data...");
        try {
          const tempBungieUserDataObject = await traveler.user.getMembershipDataForCurrentUser(oauthServerResponse.access_token);
          setBungieMembershipData(tempBungieUserDataObject);
          console.log("Bungie Membership Data:", tempBungieUserDataObject);
        } catch (error) {
            console.error("Error fetching Bungie membership data:", error);
        }
      }
    };

    getBungieMembershipData();
  }, [oauthServerResponse, traveler]); // Add traveler dependency

  // 3. Get Character Profiles when Membership Data is available
  useEffect(() => {
    const getUserProfileInformation = async () => {
      // Ensure we have the necessary data and token
      if (bungieMembershipData?.Response?.destinyMemberships?.length && oauthServerResponse?.access_token) {
         // Prefer PLATFORM_BUNGIE_NEXT (Type 254) if available, otherwise use the first one. Add logic if multiple profiles exist (Xbox, PSN, Steam etc.)
         const primaryMembership = bungieMembershipData.Response.destinyMemberships.find(m => m.membershipType === BungieMembershipType.TigerPsn) // Example: Prioritize PSN
            || bungieMembershipData.Response.destinyMemberships[0]; 
            
         if (!primaryMembership) {
            console.error("No suitable Destiny membership found.");
            return;
         }

        console.log(`Workspaceing profile for membership type ${primaryMembership.membershipType}, ID ${primaryMembership.membershipId}`);
        const components = [
          DestinyComponentType.Characters,        // Basic character info
          DestinyComponentType.CharacterEquipment // Currently equipped items
          // Add other components if needed (e.g., CharacterInventories for inventory)
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
  }, [bungieMembershipData, oauthServerResponse, traveler]); // Add dependencies

  // 4. Fetch ALL Equipped Item Definitions when Profiles are loaded
  useEffect(() => {
    const fetchItemDefinitions = async () => {
        if (userCharacterProfiles?.Response?.characterEquipment?.data) {
            console.log("Character profiles loaded, fetching item definitions...");
            const characterIds = Object.keys(userCharacterProfiles.Response.characterEquipment.data);
            
            if (characterIds.length === 0) {
                console.log("No characters found in profile equipment data.");
                return;
            }

            // --- Get item hashes from the FIRST character ---
            // Add logic here if you need to handle multiple characters
            const firstCharacterId = characterIds[0];
            const equippedItems = userCharacterProfiles.Response.characterEquipment.data[firstCharacterId]?.items;

            if (!equippedItems || equippedItems.length === 0) {
                console.log(`No equipped items found for character ${firstCharacterId}.`);
                setuserCharacterEquipmentDefinitions([]); // Clear previous definitions
                return;
            }

            // Create a unique set of item hashes to avoid redundant fetches
            const uniqueItemHashes = [...new Set(equippedItems.map(item => item.itemHash.toString()))];
            console.log("Unique item hashes to fetch:", uniqueItemHashes);

            // Create an array of promises for fetching each definition
            const definitionPromises = uniqueItemHashes.map(hash =>
                traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, hash)
                    .then(response => response.Response) // Extract the definition data
                    .catch(error => {
                        console.error(`Error fetching definition for item hash ${hash}:`, error);
                        return null; // Return null on error to handle gracefully in Promise.all
                    })
            );

            // Wait for all promises to resolve
            const resolvedDefinitions = await Promise.all(definitionPromises);

            // Filter out any null results (due to errors) and ensure type safety
            const validDefinitions = resolvedDefinitions.filter(
                (def): def is DestinyInventoryItemDefinition => def !== null
            );

            console.log("Fetched item definitions:", validDefinitions);
            setuserCharacterEquipmentDefinitions(validDefinitions);
        } else {
            // Reset if profile data is not available
             setuserCharacterEquipmentDefinitions([]);
        }
    };

    fetchItemDefinitions();
  }, [userCharacterProfiles, traveler]); // Depend on profiles and traveler


  // 5. Filter Definitions into Weapons and Armor when definitions are ready
  useEffect(() => {
    if (userCharacterEquipmentDefinitions.length > 0) {
        console.log("Filtering fetched definitions into weapons and armor...");
        
        const weapons: DestinyInventoryItemDefinition[] = [];
        const armor: DestinyInventoryItemDefinition[] = [];

        userCharacterEquipmentDefinitions.forEach(definition => {
            // The bucket hash is usually within the definition's inventory property
            const bucketHash = definition.inventory?.bucketTypeHash;

            if (bucketHash) {
                if (WEAPON_BUCKET_HASHES.includes(bucketHash)) {
                    weapons.push(definition);
                } else if (ARMOR_BUCKET_HASHES.includes(bucketHash)) {
                    armor.push(definition);
                }
                // You could add an else clause here for items that don't fit either category
            } else {
                console.warn("Definition missing inventory.bucketTypeHash:", definition.displayProperties.name, definition.hash);
            }
        });

        // Optional: Sort items within categories if needed (e.g., by bucket, then name)
        // Example sorting: Kinetic -> Energy -> Power -> Ghost
        const weaponSortOrder = [
            BUCKET_HASHES.KINETIC_WEAPON, 
            BUCKET_HASHES.ENERGY_WEAPON, 
            BUCKET_HASHES.POWER_WEAPON, 
            BUCKET_HASHES.GHOST
        ];
        weapons.sort((a, b) => {
            const indexA = weaponSortOrder.indexOf(a.inventory.bucketTypeHash);
            const indexB = weaponSortOrder.indexOf(b.inventory.bucketTypeHash);
            return indexA - indexB;
        });

        // Example sorting: Helmet -> Arms -> Chest -> Legs -> Class Item
        const armorSortOrder = [
            BUCKET_HASHES.HELMET,
            BUCKET_HASHES.GAUNTLETS,
            BUCKET_HASHES.CHEST_ARMOR,
            BUCKET_HASHES.LEG_ARMOR,
            BUCKET_HASHES.CLASS_ARMOR
        ];
         armor.sort((a, b) => {
            const indexA = armorSortOrder.indexOf(a.inventory.bucketTypeHash);
            const indexB = armorSortOrder.indexOf(b.inventory.bucketTypeHash);
            return indexA - indexB;
        });


        console.log("Filtered Weapons:", weapons);
        console.log("Filtered Armor:", armor);

        // Set state ONCE with the final, filtered (and optionally sorted) arrays
        setUserWeapons(weapons);
        setUserArmor(armor);
    } else {
         // Reset if definitions are empty
         setUserWeapons([]);
         setUserArmor([]);
    }
  }, [userCharacterEquipmentDefinitions]); // This effect runs when the definitions are ready


  // --- Prepare Context Value ---
  // Use useMemo to avoid recreating the context value object on every render
  // unless one of its dependencies actually changes.
  const contextValue = React.useMemo(() => ({
    bungieMembershipData,
    userCharacterProfiles,
    userWeapons,
    userArmor
  }), [bungieMembershipData, userCharacterProfiles, userWeapons, userArmor]);


  // --- Render ---
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* Pass the memoized context value */}
        <BungieMembershipDataContext.Provider value={contextValue}>
          <OAuthURLEndpointContext.Provider value={oauth_url_endpoint}>
            {/* Conditionally render Dashboard only when data is ready, 
              or pass loading state down to Dashboard to handle internally.
              Example: Show loading indicator until essential data is present.
            */}
            {contextValue.userCharacterProfiles && contextValue.userWeapons.length > 0 && contextValue.userArmor.length > 0 ? (
                 <Dashboard />
            ) : (
                 <div>Loading Guardian Data...</div> // Or a more sophisticated loading component
            )}
          </OAuthURLEndpointContext.Provider>
        </BungieMembershipDataContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;