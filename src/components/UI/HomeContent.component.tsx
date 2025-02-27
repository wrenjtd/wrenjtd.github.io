import React, { useContext } from 'react';
import { AuthInformationContext } from '../../App';





const HomeContentComponent: React.FC = () => {

 const auth_endpoint = useContext(AuthInformationContext);

  
 

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (


    

    <div>
      <button onClick={() => openInNewTab(auth_endpoint)}>Login to Bungie.NET</button>
      
      
    
      

    </div>
  )

};


export default HomeContentComponent;