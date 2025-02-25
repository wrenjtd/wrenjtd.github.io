import React from 'react';
import { Link } from 'react-router-dom';



const SidebarBoxComponent: React.FC = () => {

    return(
            <div id="sidebar_div">
                <h3 id="elinks_h3">Employee Links</h3>
                
                <ul id="sidebar_ul">
                <li><Link to="/rform">Reimbursement Form</Link></li>
                
                <h3>Manager Links</h3>
                <li><Link to="/rrequest">Reimbursement Requests</Link></li>
                
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </ul>
            </div>
    )
};


export default SidebarBoxComponent;