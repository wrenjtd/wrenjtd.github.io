import { Route, Routes } from "react-router-dom";
// import FormComponent from "../UI/Form.component";
import HomeContent from "./Dashboard.component";



const MainBoxComponent: React.FC = () =>{

    return(
    <div className="bungie-user-card bg-gray-800 text-gray-200">
        
        <Routes>
                
                <Route path ="/" element= {<HomeContent/>}></Route>

                {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
            </Routes>


    </div>)

};

export default MainBoxComponent;