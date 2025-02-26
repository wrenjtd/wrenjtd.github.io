import React from "react";
import { Link } from "react-router-dom";


const HeaderBoxComponent: React.FC = () => {



    return (
        <div>
            <p>Header Box</p>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/form">Create an account</Link></button>
            {/* <button><Link to={"/read/"+id}>Read By ID</Link></button> */}

        </div>
        )

};

export default HeaderBoxComponent;