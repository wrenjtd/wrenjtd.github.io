import { useState, useEffect, createContext, useMemo } from 'react';
import { type ServerResponse } from './type-definitions/common';
import { type UserMembershipData } from './type-definitions/user';
import type { DestinyProfileResponse } from './type-definitions/destiny2';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/UI/Main/Dashboard.component';

// --- Context Type Definition ---
export type contextType = {
  bungieMembershipData: ServerResponse<UserMembershipData> | undefined;
  userCharacterProfiles: ServerResponse<DestinyProfileResponse> | undefined;
}

// --- Context Initialization ---
const defaultContextValue: contextType = {
  bungieMembershipData: undefined,
  userCharacterProfiles: undefined,
};

export const BungieMembershipDataContext = createContext<contextType>(defaultContextValue);
export const OAuthURLEndpointContext = createContext<string>("");

function App() {
  // --- State Definitions ---
  const [bungieMembershipData, setBungieMembershipData] = useState<ServerResponse<UserMembershipData> | undefined>(undefined);
  const [userCharacterProfiles, setUserCharacterProfiles] = useState<ServerResponse<DestinyProfileResponse> | undefined>(undefined);
  const [oauthURL, setOauthURL] = useState<string>(""); // New state for the resolved URL

  const oauth_url_endpoint = async () => {
    const response = await fetch("https://localhost:8080/getURL", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return JSON.stringify(data);
  };

  useEffect(() => {
    const fetchOauthURL = async () => {
      const url = await oauth_url_endpoint();
      setOauthURL(url);
    };

    fetchOauthURL();
  }, [oauth_url_endpoint]);

  useEffect(() => {
    const authorizationCodeChecker = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const response = await fetch("https://localhost:8080/sendCode", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(urlParams.get("code"))
      });
      const data = await response.json();
      setBungieMembershipData(data?.BungieMembershipData);
      setUserCharacterProfiles(data?.characterProfileData);
    };
    authorizationCodeChecker();
  }, []);

  // --- Prepare Context Value ---
  const contextValue = useMemo(() => ({
    bungieMembershipData,
    userCharacterProfiles,
  }), [bungieMembershipData, userCharacterProfiles]);

  return (
    <>
      <BrowserRouter>
        <BungieMembershipDataContext.Provider value={contextValue}>
          <OAuthURLEndpointContext.Provider value={oauthURL}>
            <Dashboard />
          </OAuthURLEndpointContext.Provider>
        </BungieMembershipDataContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
