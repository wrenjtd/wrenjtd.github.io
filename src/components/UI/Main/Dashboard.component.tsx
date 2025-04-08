import HeaderContentComponent from "../HeaderContent.component";
// import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";
import MainContentComponent from "./MainContent.component";

export default function Dashboard() {




  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <HeaderContentComponent ></HeaderContentComponent>
        <MainContentComponent></MainContentComponent>
         
            {/* <LeftbarBoxComponent membershipData={membershipData} /> */}
            <FooterBoxComponent></FooterBoxComponent>
            
       
      </div>
    </>
  )
}
