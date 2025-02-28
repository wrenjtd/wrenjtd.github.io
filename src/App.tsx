import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI_Sections/MainBox.component';
import HeaderContentComponent from './components/UI/HeaderContent.component';
import SidebarBoxComponent from './components/UI_Sections/SidebarBox.component';


import Traveler from './Traveler';
import { OAuthResponse } from './type-definitions/additons';
import React from 'react';
import FooterBoxComponent from './components/UI_Sections/FooterBox.component';


export const UserInformationContext = createContext({});
export const AuthInformationContext = createContext("");

function App() {


  const traveler = new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
    userAgent: ''
  });

  const auth_endpoint = traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID);
  const [authResponse, setAuthResponse] = useState<OAuthResponse>();

  const [membershipData, setMembershipData] = useState<any>();





  //Authorization request to authorize user
  const checker = async () => {
    if (window.location.search.includes("code")) {
      let authorizationCode: string = window.location.search.split("code=")[1];
      let oAuthResponse = traveler.oauth.getAccessToken(authorizationCode, import.meta.env.VITE_BUNGIE_CLIENT_ID, import.meta.env.VITE_BUNGIE_CLIENT_SECRET);
      setAuthResponse(await oAuthResponse);
    }


  }

  const getMembershipData = async () => {

    if (authResponse?.membership_id) {

      let membershipData2 = traveler.user.getMembershipDataForCurrentUser(authResponse?.access_token);
      setMembershipData(await membershipData2);
    }
  }




  useEffect(() => {
    checker();
  }, [])

  useEffect(() => {


    if (authResponse?.membership_id) {

      getMembershipData();
    }


  }, [authResponse])






  return (
    <React.Fragment>
      <BrowserRouter>

        <div id="parent_flex_container" className="bg-gray-900 text-gray-200 min-h-screen">

          <UserInformationContext.Provider value={membershipData}>
            <HeaderContentComponent></HeaderContentComponent>

            <div id="main_flex_container" className="flex justify-between p-2">

              <div id="sidebar_flex_container" className="w-48 p-2 border border-gray-700">

                <SidebarBoxComponent></SidebarBoxComponent>
              </div>

              <div id="main_content_flex" className="flex-1 p-2 border border-gray-700 mx-2">
                <AuthInformationContext.Provider value={auth_endpoint}>
                  <MainBoxComponent></MainBoxComponent>
                </AuthInformationContext.Provider>
              </div>


            </div>
          </UserInformationContext.Provider>
          <FooterBoxComponent></FooterBoxComponent>
        </div>
      </BrowserRouter>

    </React.Fragment>
  )

}

export default App

