import { useEffect, useState } from 'react'
import './App.css'
import { OAuth2Client, OAuth2Fetch, generateCodeVerifier } from '@badgateway/oauth2-client';



function App() {
  const [count, setCount] = useState(0);
  const [some, setSome] = useState(48832);
  const [eData, setEData] = useState({});
  const [authResp, setAuthResp] = useState({});
  
  const auth_endpoint = `https://www.bungie.net/en/OAuth/Authorize?client_id=${some}&response_type=code`;
  const base_url = "https://www.bungie.net/en/OAuth/";
  const redirect_uri = "https://wrenjtd.github.io/";
  const token_url = "/token/";
  const auth_url = "/authorize";
  

  const additionalHeaders = { 'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY, 'origin': 'https://wrenjtd.github.io/' };

  const codeVerifier =  generateCodeVerifier();



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
    let authorizationResponse = await fetch(`https://www.bungie.net/en/OAuth/Authorize?client_id=${some}&response_type=code`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + btoa(import.meta.env.VITE_BUNGIE_API_CLIENT_ID + ":" + import.meta.env.VITE_BUNGIE_API_CLIENT_SECRET),
        'grant_type': 'authorization_code',
        ...additionalHeaders

    }, mode: 'no-cors'
 })
    console.log(auth_endpoint);
    //exchange code for token
    setAuthResp(authorizationResponse);
    session.authorizationCode.getToken({
      code: authResp.toString(),
      redirectUri: redirect_uri,
    });
    const myData = await fetch("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {headers: additionalHeaders} );
    console.log("My data is here: " , myData);
}


 







  // const fetchWrapper = new OAuth2Fetch({
  //   client: session,

  // getNewToken: async () => {

  //   // // Example
  //   // return session.clientCredentials();

  //   // Another example
  //   return session.authorizationCode.getToken({
  //     code: authResp.toString(),
  //     redirectUri: redirect_uri,
  //   });

  // },


  // onError: (err) => {
  //   // err is of type Error
  //   console.error(err);
  // }
  // })

  
  


 


  


 

  // const getData = async () => {
    
  //   const oauth2Token = await session.authorizationCode.getTokenFromCodeRedirect(
  //     document.location.href,
  //     {
  //       redirectUri: redirect_uri
  //     }
  //   );

  // }

  // const getData2 = async () => {
  //   let data = await fetch("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {headers: {'Host': 'localhost:5173'}} );
  //   console.log(data);
  // }

  


  useEffect(() => {
    // setSome(import.meta.env.VITE_BUNGIE_API_CLIENT_ID);
    getData();

  }, [])

  return (
    <>

      <div className="card">
        <p></p>
        <p>Click Me!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )

}

export default App

