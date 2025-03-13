import { useContext } from "react";
import { BungieMembershipDataContext } from "../../../App";
import HeaderContentComponent from "../HeaderContent.component";
// import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";
import MainContentComponent from "./MainContent.component";

export default function Dashboard({userCharacterProfiles}: any) {

  const membershipData: any = useContext(BungieMembershipDataContext);


  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">



        <HeaderContentComponent membershipData={membershipData}></HeaderContentComponent>
        <MainContentComponent membershipData={membershipData} {...userCharacterProfiles}></MainContentComponent>
         
            {/* <LeftbarBoxComponent membershipData={membershipData} /> */}
            <FooterBoxComponent></FooterBoxComponent>
            
       
      </div>
    </>
  )
}
