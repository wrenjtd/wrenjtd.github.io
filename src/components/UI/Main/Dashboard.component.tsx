import HeaderContentComponent from "../HeaderContent.component";
// import LeftbarBoxComponent from "../LeftbarBox.component";
import FooterBoxComponent from "../FooterBox.component";
import MainContentComponent from "./MainContent.component";
import { Routes, Route } from "react-router-dom";
import PickerComponent from "./Picker.component";

export default function Dashboard() {




  return (

    <div>
      <HeaderContentComponent ></HeaderContentComponent>
      <div className="flex flex-col min-h-screen bg-gray-800">

        <Routes>
          <Route path="/" element={<MainContentComponent />}></Route>
          <Route path="/picker" element={<PickerComponent />}></Route>
          {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
        </Routes>

        {/* <LeftbarBoxComponent membershipData={membershipData} /> */}

      </div>
      <FooterBoxComponent></FooterBoxComponent>
    </div>
  )
}
