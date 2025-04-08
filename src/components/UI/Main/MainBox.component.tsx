import { Route, Routes } from "react-router-dom";
// import FormComponent from "../UI/Form.component";
import Dashboard from "./Dashboard.component";



const MainBoxComponent: React.FC = () =>{

    return(
   
        <Routes>
                <Route path ="/" element= {<Dashboard />}></Route>
                {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
            </Routes>


   )

};

export default MainBoxComponent;