import { useEffect, useState} from 'react'
import './App.css'
//import { OAuthError } from './errors';
import { OAuthResponse } from './type-definitions/additons';
import Traveler from './Traveler';
// import ky from 'ky';






function App() {
  
  // const some = 48832;

  const traveler = new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY as string,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.OAUTH_SECRET,
    userAgent: ''
  });


  //const [authResp, setAuthResp] = useState<OAuthResponse>();
  const [urlAuthCode, setURLAuthCode] = useState("");

  const auth_endpoint = traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID);
  //const base_url = "https://www.bungie.net/en/OAuth/";
  //const redirect_uri = "https://wrenjtd.github.io/";
  const token_url = "https://www.bungie.net/Platform/App/OAuth/Token/";
  //const auth_url = "/authorize";






  //const additionalHeaders = { 'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY};


  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


 

  
  const getAccessToken = async (authorizationCode: string)  =>  {

    const myResponse = await fetch(token_url, {
      method: 'POST',
      headers: {
        'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${window.btoa(`${import.meta.env.VITE_BUNGIE_CLIENT_ID}:${import.meta.env.VITE_BUNGIE_CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        'client_id': import.meta.env.VITE_BUNGIE_CLIENT_ID,
        'client_secret': import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
        'grant_type': "authorization_code",
        'code': authorizationCode
      }).toString()
    })

    let thisThing = await myResponse.json();
    let myThing: OAuthResponse = thisThing;
    console.log("About to show you OAuthResponse");
    console.log(myThing);

    
    
   

  }


  // const getRefreshToken = (refreshToken: string) => {
    
  //   fetch(token_url, {
  //     method: 'POST',
  //     headers: {
  //       'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY,
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Authorization': `Basic ${window.btoa(`${import.meta.env.VITE_BUNGIE_CLIENT_ID}:${import.meta.env.VITE_BUNGIE_CLIENT_SECRET}`)}`
  //     },
  //     body: new URLSearchParams({
  //       'client_id': import.meta.env.VITE_BUNGIE_CLIENT_ID,
  //       'client_secret': import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
  //       'grant_type': "refresh_token",
  //       'refresh_token': refreshToken
  //     }).toString()
  //   }).then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     setAuthResp(data);
  //     console.log(authResp);
  //   })
  // }


  

  

  //Authorization request to authorize user
  const checker = async () => {
  if(window.location.search.includes("code")){
    console.log("Checker is running");
    let tempAuthCode = window.location.search.split("code=")[1];
    console.log(tempAuthCode);
    setURLAuthCode(tempAuthCode);
    //console.log(urlAuthCode);
    
    let oAuthThing = traveler.oauth.getAccessToken(tempAuthCode, import.meta.env.VITE_BUNGIE_CLIENT_ID, import.meta.env.VITE_BUNGIE_CLIENT_SECRET);
    console.log(oAuthThing);
    //getAccessToken(tempAuthCode);
  }
    

  }



  useEffect(() => {
    checker();


  }, [])

  return (
    <>

      <div className="card">

        <button onClick={() => openInNewTab(auth_endpoint)}>Login to Bungie.NET
        </button>

        <button onClick={() => getAccessToken(urlAuthCode)}>Get Access Token</button>
        
       

      

      </div>

    </>
  )

}

export default App

