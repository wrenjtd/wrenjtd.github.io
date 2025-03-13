import { Route, Routes } from "react-router-dom";
// import FormComponent from "../UI/Form.component";
import HomeContent from "./Dashboard.component";



const MainBoxComponent: React.FC = ({userCharacterProfiles}: any) =>{

    return(
    <div className="h-[100%] w-[100%] bg-gray-800 text-gray-200">
        
        <Routes>
                
                <Route path ="/" element= {<HomeContent userCharacterProfiles={userCharacterProfiles}/>}></Route>

                {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
            </Routes>


    </div>)

};

export default MainBoxComponent;