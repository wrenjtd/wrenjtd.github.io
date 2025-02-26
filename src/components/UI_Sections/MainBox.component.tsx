import { Navigate, Route, Routes } from "react-router-dom";
// import FormComponent from "../UI/Form.component";
import HomeContent from "../UI/HomeContent.component";



const MainBoxComponent: React.FC = () =>{



    return(
    <div>
        
        
        <Routes>
                
                <Route path ="/" element= {<HomeContent/>}></Route>
                {/* <Route path="/form" element={<FormComponent/>}></Route> */}
                
                {/* <Route path ="/" element ={<Navigate replace to="/home" />}/> */}
            </Routes>


    </div>)

};

export default MainBoxComponent;