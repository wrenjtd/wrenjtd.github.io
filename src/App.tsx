import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI/Main/MainBox.component';
import HeaderContentComponent from './components/UI/Header/HeaderContent.component';
import LeftbarBoxComponent from './components/UI/Leftbar/LeftbarBox.component';


import Traveler from './Traveler';
import { OAuthResponse } from './type-definitions/additons';
import React from 'react';
import FooterBoxComponent from './components/UI/Footer/FooterBox.component';


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





  //Checks if the authorization code is in the URL and if it is, it gets the access token
  const authorizationCodeChecker = async () => {
    if (window.location.search.includes("code")) {
      let authorizationCode: string = window.location.search.split("code=")[1];
      let oAuthResponse = traveler.oauth.getAccessToken(authorizationCode, import.meta.env.VITE_BUNGIE_CLIENT_ID, import.meta.env.VITE_BUNGIE_CLIENT_SECRET);
      setOauthServerResponse(await oAuthResponse);
    }


  }

  //Gets Bungie membership data for the current user
  const getBungieMembershipData = async () => {
    if (oauthServerResponse?.membership_id) {
      let tempBungieUserDataObject = traveler.user.getMembershipDataForCurrentUser(oauthServerResponse?.access_token);
      setBungieMembershipData(await tempBungieUserDataObject);
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






  return (
    <React.Fragment>
      <BrowserRouter>

        <div id="app_parent_div" className="bg-gray-900 text-gray-200 min-h-screen">

          <BungieMembershipDataContext.Provider value={bungieMembershipData}>
            <HeaderContentComponent></HeaderContentComponent>

            <div id="mainbox_component_flex_container" className="flex justify-between p-2">

              <div id="leftbar_component_div" className="w-48 p-2 border border-gray-700">

                <LeftbarBoxComponent></LeftbarBoxComponent>
              </div>

              <div id="mainboxcontent_component_div" className="flex-1 p-2 border border-gray-700 mx-2">
                <OAuthURLEndpointContext.Provider value={oauth_url_endpoint}>
                  <MainBoxComponent></MainBoxComponent>
                </OAuthURLEndpointContext.Provider>
              </div>


            </div>
          </BungieMembershipDataContext.Provider>
          <FooterBoxComponent></FooterBoxComponent>
        </div>
      </BrowserRouter>

    </React.Fragment>
  )

}

export default App

