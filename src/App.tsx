import { useEffect, useState } from 'react'
import './App.css'
import { OAuth2Client, generateCodeVerifier } from '@badgateway/oauth2-client';



function App() {
  //const [count, setCount] = useState(0);
  const some = 48832;
 
  const [authResp, setAuthResp] = useState({});
  
  const auth_endpoint = `https://www.bungie.net/en/OAuth/Authorize?client_id=${some}&response_type=code`;
  const base_url = "https://www.bungie.net/en/OAuth/";
  const redirect_uri_2 = "https://wrenjtd.github.io/";
  //const redirect_uri = "localhost:5173/";
  const token_url = "/token/";
  const auth_url = "/authorize";
  
  
  
  
  const additionalHeaders = { 'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY, 'origin': 'https://wrenjtd.github.io/' };

 
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  //Start new session
  const session = new OAuth2Client({
    server: base_url,
    clientId: import.meta.env.VITE_BUNGIE_API_CLIENT_ID,
    clientSecret: import.meta.env.VITE_BUNGIE_API_SECRET,
    tokenEndpoint: token_url,
    authorizationEndpoint: auth_url

  });


  //Authorization request to authorize user
  const getData = async () => {
    const codeVerifier = await generateCodeVerifier();
    const authorizationResponse = await fetch(auth_endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + btoa(import.meta.env.VITE_BUNGIE_API_CLIENT_ID + ":" + import.meta.env.VITE_BUNGIE_API_CLIENT_SECRET),
        'grant_type': 'authorization_code&code=f8ab7a7c1954cd44854793c400315ae6',
        ...additionalHeaders

    }, mode: 'no-cors'
    
 })
    
    
    // //exchange code for token
    setAuthResp(authorizationResponse);

    console.log(authResp);
    session.authorizationCode.getToken({
      code: "?code=f8ab7a7c1954cd44854793c400315ae6",
      redirectUri: redirect_uri_2,
      codeVerifier,
    });
    
}



  useEffect(() => {

    

  }, [])

  return (
    <>

      <div className="card">
        
        <button onClick={() => openInNewTab(auth_endpoint)}>Click Me!
        </button>

        <button onClick={() => getData()}>Don't click me yet!
        </button>

      </div>

    </>
  )

}

export default App

