import { useEffect} from 'react'
import './App.css'
//import { OAuthError } from './errors';
// import { OAuthResponse, TravelerConfig } from './type-definitions/additons';
// import ky from 'ky';






function App() {
  //const [count, setCount] = useState(0);
  // const some = 48832;

  //const [authResp, setAuthResp] = useState({});

  const auth_endpoint = "https://www.bungie.net/en/OAuth/Authorize?client_id=" + 48832 + "&response_type=code";
  //const base_url = "https://www.bungie.net/en/OAuth/";
  //const redirect_uri = "https://wrenjtd.github.io/";
  //const redirect_uri = "localhost:5173/";
  //const token_url = "/token/";
  //const auth_url = "/authorize";






  //const additionalHeaders = { 'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY};


  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


 

  // const generateOAuthURL = (oauthClientId: string): string => {
  //   if (oauthClientId !== undefined) {
  //     return `https://www.bungie.net/en/OAuth/Authorize?client_id=${oauthClientId}&response_type=code`;
  //   } else {
  //     throw new OAuthError('You did not specify a OAuth client Id');
  //   }
  // }

  


  

  

  //Authorization request to authorize user
  const checker = async () => {
  var tokenData = '';
  if(window.location.search.includes("code")){

    const code = window.location.search.split("code=")[1];

    fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
      method: 'POST',
      headers: {
        'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${window.btoa(`${import.meta.env.VITE_BUNGIE_CLIENT_ID}:${import.meta.env.VITE_BUNGIE_CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        'client_id': import.meta.env.VITE_BUNGIE_CLIENT_ID,
        'grant_type': "authorization_code",
        'code': code
      }).toString()
    }).then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      tokenData = data;
      console.log(data);
    })
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

       

      

      </div>

    </>
  )

}

export default App

