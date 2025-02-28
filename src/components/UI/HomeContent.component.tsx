import React, { useContext, useEffect, useState } from 'react';
import { AuthInformationContext, UserInformationContext } from '../../App';





const HomeContentComponent: React.FC = () => {

  const membershipData = useContext(UserInformationContext); 
  const auth_endpoint = useContext(AuthInformationContext);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [membershipData2, setMembershipData2] = useState<any>(); 


 useEffect(() => {
    if (membershipData) 
        setMembershipData2(membershipData);
  }
    , [membershipData]);

  useEffect(() => {
    if (membershipData2) 
        setIsButtonVisible(false);
  }
    , [membershipData2]);


  

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  

  return (

    <div>
{   isButtonVisible &&  <button onClick={() => openInNewTab(auth_endpoint)}>Login to Bungie.NET</button>
}
    </div>
  )

};


export default HomeContentComponent;