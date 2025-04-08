import HeaderContentComponent from "../HeaderContent.component";
// import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";
import MainContentComponent from "./MainContent.component";

export default function Dashboard() {




  return (
    <>
      <div className="min-h-screen flex flex-col border-black border-2">
        <HeaderContentComponent ></HeaderContentComponent>
        <MainContentComponent></MainContentComponent>

        {/* <LeftbarBoxComponent membershipData={membershipData} /> */}

        <div className="flex  items-end justify-end ">
          <FooterBoxComponent></FooterBoxComponent>
        </div>

      </div>
    </>
  )
}
