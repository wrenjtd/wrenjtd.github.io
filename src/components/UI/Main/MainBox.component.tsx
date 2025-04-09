import { Route, Routes } from "react-router-dom";
// import FormComponent from "../UI/Form.component";
import Dashboard from "./Dashboard.component";
import PickerComponent from "./Picker.component";



const MainBoxComponent: React.FC = () =>{

    return(
   
        <Routes>
                <Route path ="/" element= {<Dashboard />}></Route>
                <Route path ="/Picker" element= {<PickerComponent/>}></Route>
                {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
            </Routes>


   )

};

export default MainBoxComponent;