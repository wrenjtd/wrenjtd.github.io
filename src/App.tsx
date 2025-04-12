import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI/Main/MainBox.component';
import Traveler from './Traveler';
import { OAuthResponse, TypeDefinition } from './type-definitions/additons';
import React from 'react';
import { BungieMembershipType, ServerResponse } from './type-definitions/common';
import { DestinyComponentType, DestinyInventoryItemDefinition, DestinyProfileResponse } from './type-definitions/destiny2';
import { UserMembershipData } from './type-definitions/user';

export type contextType = {
  bungieMembershipData: ServerResponse<UserMembershipData>;
  userCharacterProfiles: ServerResponse<DestinyProfileResponse>;
  userEquipmentEntities: ServerResponse<DestinyInventoryItemDefinition>[];
  userWeapons: ServerResponse<DestinyInventoryItemDefinition>[];
  userArmor: ServerResponse<DestinyInventoryItemDefinition>[];
}


export const BungieMembershipDataContext = createContext({});
export const OAuthURLEndpointContext = createContext("");

function App() {


  const traveler = new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
    userAgent: ''
  });

  const oauth_url_endpoint = traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID);
  const [oauthServerResponse, setOauthServerResponse] = useState<OAuthResponse>();

  const [bungieMembershipData, setBungieMembershipData] = useState<ServerResponse<UserMembershipData>>();
  const [userCharacterProfiles, setUserCharacterProfiles] = useState<ServerResponse<DestinyProfileResponse>>();
  

  const [userCharacterEquipment, setuserCharacterEquipment] = useState <DestinyInventoryItemDefinition[]>([] as DestinyInventoryItemDefinition[]);

  const [testArray, setTestArray] = useState<DestinyInventoryItemDefinition[]>([] as DestinyInventoryItemDefinition[]);
  
  // const [testArray2, setTestArray2] = useState<ServerResponse<DestinyInventoryItemDefinition>[]>([] as ServerResponse<DestinyInventoryItemDefinition>[]);



  const [userWeapons, setUserWeapons] = useState<ServerResponse<DestinyInventoryItemDefinition>[]>([] as ServerResponse<DestinyInventoryItemDefinition>[]);
  const [userArmor, setUserArmor] = useState<ServerResponse<DestinyInventoryItemDefinition>[]>([] as ServerResponse<DestinyInventoryItemDefinition>[]);



  //Checks if the authorization code is in the URL and if it is, it gets the access token
  const authorizationCodeChecker = async () => {
    if (window.location.search.includes("code")) {
      const authorizationCode: string = window.location.search.split("code=")[1];
      const oAuthResponse = traveler.oauth.getAccessToken(authorizationCode, import.meta.env.VITE_BUNGIE_CLIENT_ID, import.meta.env.VITE_BUNGIE_CLIENT_SECRET);
      setOauthServerResponse(await oAuthResponse);
    }

  }

  //Gets Bungie membership data for the current user
  const getBungieMembershipData = async () => {
    if (oauthServerResponse?.membership_id) {
      const tempBungieUserDataObject = traveler.user.getMembershipDataForCurrentUser(oauthServerResponse?.access_token);
      setBungieMembershipData(await tempBungieUserDataObject);
    }
  }

  //Gets character information and inventory items via Hash Codes
  const getUserProfileInformation = async () => {
    if (bungieMembershipData && oauthServerResponse) {
      const components = [DestinyComponentType.Characters, DestinyComponentType.CharacterEquipment];
      const tempBungieCharacterProfileDataObject = traveler.destiny2.getProfile(BungieMembershipType.TigerXbox, bungieMembershipData.Response.destinyMemberships[0].membershipId, { components }, oauthServerResponse.access_token);
      setUserCharacterProfiles(await tempBungieCharacterProfileDataObject);
    }
  }

  useEffect(() => {
    authorizationCodeChecker();
  }, [])

  useEffect(() => {

    if (oauthServerResponse?.membership_id) {
      getBungieMembershipData();
    }

  }, [oauthServerResponse])

  useEffect(() => {
    if (bungieMembershipData)
      getUserProfileInformation();
  }, [bungieMembershipData])

  useEffect(() => {
    if (userCharacterProfiles) {

      for(let i = 0; i < userCharacterProfiles.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.length - 1; i ++ ){
        let temp: DestinyInventoryItemDefinition = {} as DestinyInventoryItemDefinition;
        traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, userCharacterProfiles.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items[i].itemHash.toString()).then(response => {
           temp = response.Response;
        }
        ).then(() => {
          console.log("Temp:", temp);
          setuserCharacterEquipment((prev) => [...prev, temp]);
        }
        )
      }

    }
  }, [userCharacterProfiles])


  const getArray1 = ()=> {
    console.log("UCE:", userCharacterEquipment)
    if(userCharacterEquipment.length > 16){
      for(let i = 3; i < 8; i ++ ){
        setTestArray((prev) => [...prev, userCharacterEquipment[i]]); 
      }
    }
    
    
  }

useEffect(() => {
  if(testArray.length > 0){
    console.log(testArray);
  }
}, [testArray])


  
  const kinectWeaponFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 1498876634 === item.bucketHash;

  })


  const energyWeaponFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 2465295065 === item.bucketHash;

  })



  const powerWeaponFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 953998645 === item.bucketHash;

  })


  const ghostWeaponFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 4023194814 === item.bucketHash;

  })

  const helmetArmorFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 3448274439 === item.bucketHash;

  })

  const gaunletArmorFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 3551918588 === item.bucketHash;

  })

  const chestArmorFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 14239492 === item.bucketHash;

  })

  const feetArmorFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 20886954 === item.bucketHash;

  })

  const classArmorFilter = userCharacterProfiles?.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items.filter((item) => {
    return 1585787867 === item.bucketHash;

  })



  const getHelmetArmor = () => {
    helmetArmorFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserArmor((prev) => [...prev, response]);
      })
    })
  }

  const getGaunletArmor = () => {
    gaunletArmorFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserArmor((prev) => [...prev, response]);
      })
    })
  }

  const getChestArmor = () => {
    chestArmorFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserArmor((prev) => [...prev, response]);
      })
    })
  }

  const getFeetArmor = () => {
    feetArmorFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserArmor((prev) => [...prev, response]);
      })
    })
  }

  const getClassArmor = () => {
    classArmorFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserArmor((prev) => [...prev, response]);
      })
    })
  }

  const getEnergyWeapons = () => {
    energyWeaponFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserWeapons((prev) => [...prev, response]);
      })
    })
  }

  const getPowerWeapons = () => {
    powerWeaponFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserWeapons((prev) => [...prev, response]);
      })
    })
  }

  const getGhost = () => {
    ghostWeaponFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserWeapons((prev) => [...prev, response]);
      })
    })
  }

  const getKinectWeapons = () => {
    kinectWeaponFilter?.forEach((item) => {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, item.itemHash.toString()).then(response => {
        setUserWeapons((prev) => [...prev, response]);
      })
    })
  }


  if (userWeapons.length == 0 && userCharacterEquipment !== undefined) {
    getEnergyWeapons();
    getPowerWeapons();
    getKinectWeapons();
    getGhost();
    getHelmetArmor();
    getChestArmor();
    getGaunletArmor();
    getFeetArmor();
    getClassArmor();
    getArray1();

    // setUserEquipmentEntities((prev) => [...prev.filter((item) => prev.indexOf(item) !== -1)]);
  }



  const props = {
    userCharacterProfiles, bungieMembershipData, userWeapons, userArmor
  }


  return (
    <React.Fragment>
      <BrowserRouter>

        <BungieMembershipDataContext.Provider value={{ ...props }}>
          <OAuthURLEndpointContext.Provider value={oauth_url_endpoint}>
            <MainBoxComponent></MainBoxComponent>
          </OAuthURLEndpointContext.Provider>
        </BungieMembershipDataContext.Provider>
      </BrowserRouter>

    </React.Fragment>
  )

}

export default App

