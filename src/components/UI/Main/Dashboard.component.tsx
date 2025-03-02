import { useContext } from "react";
import { BungieMembershipDataContext } from "../../../App";
import HeaderContentComponent from "../Header/HeaderContent.component";
import LeftbarBoxComponent from "../Leftbar/LeftbarBox.component";
import FooterBoxComponent from "../Footer/FooterBox.component";

export default function Dashboard() {

  const membershipData: any = useContext(BungieMembershipDataContext);


  return (
    <>
      <div className="min-h-full">



        <HeaderContentComponent membershipData={membershipData}></HeaderContentComponent>

        <main>
          { /* mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 */}
          <div className="">
            <LeftbarBoxComponent membershipData={membershipData} />
            <FooterBoxComponent></FooterBoxComponent>
            
          </div>
        </main>
      </div>
    </>
  )
}
