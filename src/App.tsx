import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI/Main/MainBox.component';
import Traveler from './Traveler';
import { OAuthResponse, TypeDefinition } from './type-definitions/additons';
import React from 'react';
import { BungieMembershipType } from './type-definitions/common';
import { DestinyComponentType } from './type-definitions/destiny2';



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

  const [bungieMembershipData, setBungieMembershipData] = useState<any>();
  const [userCharacterProfiles, setUserCharacterProfiles] = useState<any>();
  const [userCharacterEquipment, setUserCharacterEquipment] = useState<any>();

  

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

  const getUserProfileInformation = async () => {
    if (bungieMembershipData && oauthServerResponse) {
      const components = [DestinyComponentType.Characters, DestinyComponentType.CharacterEquipment];
      const tempBungieCharacterProfileDataObject = traveler.destiny2.getProfile(BungieMembershipType.TigerXbox, bungieMembershipData.Response.primaryMembershipId,{components}, oauthServerResponse.access_token);
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
    getUserProfileInformation();
  }, [bungieMembershipData])

  useEffect(() => {
    if (userCharacterProfiles) {
      traveler.destiny2.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, userCharacterProfiles.Response.characterEquipment.data[Object.keys(userCharacterProfiles.Response.characterEquipment.data)[0]].items[0].itemHash).then(response => {
            setUserCharacterEquipment(response.Response);
          })
    }
  },[userCharacterProfiles])

  useEffect(() => {
    if(userCharacterEquipment){
    console.log(userCharacterEquipment.displayProperties.name);
    }
  }
  ,[userCharacterEquipment])

  const props = {
    userCharacterEquipment, userCharacterProfiles, bungieMembershipData
  }



  return (
    <React.Fragment>
      <BrowserRouter>

        <BungieMembershipDataContext.Provider value={{...props}}>
          <OAuthURLEndpointContext.Provider value={oauth_url_endpoint}>
            <MainBoxComponent></MainBoxComponent>
          </OAuthURLEndpointContext.Provider>
        </BungieMembershipDataContext.Provider>
      </BrowserRouter>

    </React.Fragment>
  )

}

export default App

