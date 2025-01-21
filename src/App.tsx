import { useEffect, useState } from 'react'
import './App.css'
import { OAuth2Client } from '@badgateway/oauth2-client';



function App() {
  const [count, setCount] = useState(0);
  
  // const base_auth_url = "https://www.bungie.net/en/OAuth/Authorize";
  // const redirect_uri = "https://github.com/wrenjtd/destiny2-situational-loadout";
  // const token_url = "https://www.bungie.net/Platform/App/OAuth/token/";
  // const get_user_details_endpoint = "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/";

  const base_url = "https://www.bungie.net/en/OAuth/";
  //const redirect_uri = "https://github.com/wrenjtd/destiny2-situational-loadout";
  const token_url = "/token/";
  const auth_url = "/authorize";
  //const get_user_details_endpoint = "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/";

  const additionalHeaders = { 'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY};

  const session = new OAuth2Client({
    server: base_url,
    clientId: import.meta.env.VITE_BUNGIE_API_CLIENT_ID,
    clientSecret: import.meta.env.VITE_BUNGIE_API_SECRET,
    tokenEndpoint: token_url,
    authorizationEndpoint: auth_url,

  });

  console.log("Session info:" + session);

//  const postFetch = async () => {
//     let data = await fetch("https://www.bungie.net/en/OAuth/Authorize?client_id="+ client2+ "&response_type=code", {
//       method: 'GET',
//       headers: {
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         // 'authorization': 'Basic ' + btoa(clientID + ":" + clientSecret),
//         // 'grant_type': 'authorization_code',
//         ...additionalHeaders

//     }, mode: 'no-cors'
//  })
// }


  


  const [eData, setEData] = useState("");

  const getData = async () => {
    let data = await fetch("https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", { headers: additionalHeaders });
    console.log(data.json());

  }

  // const getData = async () => {
  //   let data = await fetch("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {headers: {'Host': 'localhost:5173'}} );
  //   console.log(data);
  // }

  


  useEffect(() => {
    let info = 
    getData();
    
    setEData(String(info));

  }, [])

  return (
    <>

      <div className="card">
        <p>{eData}</p>
        <p>Click Me!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )

}

export default App

