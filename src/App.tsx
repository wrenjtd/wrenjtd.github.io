import { useEffect } from 'react'
import './App.css'
import Traveler from './Traveler';






function App() {

  const traveler = new Traveler({
    apikey: import.meta.env.VITE_BUNGIE_API_KEY as string,
    debug: true,
    oauthClientId: import.meta.env.VITE_BUNGIE_CLIENT_ID,
    oauthClientSecret: import.meta.env.OAUTH_SECRET,
    userAgent: ''
  });

  const auth_endpoint = traveler.oauth.generateOAuthURL(import.meta.env.VITE_BUNGIE_CLIENT_ID);



  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  //Authorization request to authorize user
  const checker = async () => {
    if (window.location.search.includes("code")) {
      console.log("Checker is running");
      let tempAuthCode = window.location.search.split("code=")[1];
      console.log(tempAuthCode);

      let oAuthThing = traveler.oauth.getAccessToken(tempAuthCode, import.meta.env.VITE_BUNGIE_CLIENT_ID, import.meta.env.VITE_BUNGIE_CLIENT_SECRET);
      console.log(oAuthThing);

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

