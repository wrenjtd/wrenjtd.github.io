import { useContext } from "react";
import { BungieMembershipDataContext } from "../../../App";
import HeaderContentComponent from "../HeaderContent.component";
import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";

export default function Dashboard() {

  const membershipData: any = useContext(BungieMembershipDataContext);


  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">



        <HeaderContentComponent membershipData={membershipData}></HeaderContentComponent>

        
          { /* mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 */}
         
            <LeftbarBoxComponent membershipData={membershipData} />
            <FooterBoxComponent></FooterBoxComponent>
            
       
      </div>
    </>
  )
}
