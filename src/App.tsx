import { useState, useEffect, createContext } from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI_Sections/MainBox.component';
import HeaderContentComponent from './components/UI/HeaderContent.component';
import SidebarBoxComponent from './components/UI_Sections/SidebarBox.component';


import Traveler from './Traveler';
import { OAuthResponse } from './type-definitions/additons';
import React from 'react';


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

 
  if (authResponse?.membership_id){
    getMembershipData();
  }
 
 
}, [authResponse])

useEffect(() => {   
  if(membershipData){
  {`${membershipData}`}
  } 
}
  , [membershipData])


  

  return (
    <React.Fragment>
    <BrowserRouter>
    
    <UserInformationContext.Provider value={membershipData}>
    <HeaderContentComponent></HeaderContentComponent>
    </UserInformationContext.Provider>
    <div id="main_flex_container">
    
      <SidebarBoxComponent></SidebarBoxComponent>
      <AuthInformationContext.Provider value={auth_endpoint}>
      <MainBoxComponent></MainBoxComponent>
      </AuthInformationContext.Provider>
      </div>
    </BrowserRouter>
    
  </React.Fragment>
  )

}

export default App

