import React from 'react';
import Traveler from '../../Traveler';
import { OAuthResponse } from '../../type-definitions/additons';
import { useEffect, useState, createContext } from 'react';

const [membershipData, setMembershipData] = useState<any>({});

export const UserInformationContext = createContext(membershipData? membershipData : {});

const HomeContentComponent: React.FC = () => {

  

  const traveler = new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
    userAgent: ''
  });

  const auth_endpoint = traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID);
  const [authResponse, setAuthResponse] = useState<OAuthResponse>();
 



  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


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

    
    getMembershipData();
  }, [authResponse])


  return (


    

    <div>
      <button onClick={() => openInNewTab(auth_endpoint)}>Login to Bungie.NET</button>
      <UserInformationContext.Provider value={membershipData}> </UserInformationContext.Provider>
      {`${membershipData}`}
      

    </div>
  )

};


export default HomeContentComponent;