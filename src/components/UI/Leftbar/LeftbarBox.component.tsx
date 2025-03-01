import React from 'react';
import { Link } from 'react-router-dom';
import './Leftbar.css';



const LeftbarBoxComponent: React.FC = () => {

    return(
            <div id="leftbar_div">
                <h3>Employee Links</h3>
                
                <ul id="leftbar_div_ul">
                <li><Link to="/rform">Reimbursement Form</Link></li>
                
                <h3>Manager Links</h3>
                <li><Link to="/rrequest">Reimbursement Requests</Link></li>
                
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </ul>
            </div>
    )
};


export default LeftbarBoxComponent;