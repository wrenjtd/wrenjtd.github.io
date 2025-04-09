import HeaderContentComponent from "../HeaderContent.component";
// import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";
import MainContentComponent from "./MainContent.component";

export default function Dashboard() {




  return (
    <>
      <div className="min-h-screen bg-gray-800 border-amber-300 border-4">
        <HeaderContentComponent ></HeaderContentComponent>
        <MainContentComponent></MainContentComponent>

        {/* <LeftbarBoxComponent membershipData={membershipData} /> */}

        <div className ="flex justify-end">
          <FooterBoxComponent></FooterBoxComponent>
        </div>

      </div>
    </>
  )
}
