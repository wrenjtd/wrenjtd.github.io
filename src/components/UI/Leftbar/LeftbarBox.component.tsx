
import { ApiResponse } from '../../../type-definitions/additons';
import { ServerResponse } from '../../../type-definitions/common';
import MainContentComponent from '../Main/MainContent.component';
// import { Link } from 'react-router-dom';
// import './Leftbar.css';


const LeftbarBoxComponent = ({membershipData}:{membershipData:ServerResponse<ApiResponse>}) => {

    return(
            // <div id="leftbar_div">
            //     <h3>Employee Links</h3>
                
            //     <ul id="leftbar_div_ul">
            //     <li><Link to="/rform">Reimbursement Form</Link></li>
                
            //     <h3>Manager Links</h3>
            //     <li><Link to="/rrequest">Reimbursement Requests</Link></li>
                
            //     <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            //     </ul>
            // </div>






<div className="flex-1 bg-gray-900 text-gray-100 ">
  <aside className="flex min-h-full w-20 flex-col items-center border-r border-gray-900 bg-gray-800">
    

    <div className="flex flex-col items-center gap-y-4 py-10">
      <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100">
        <svg width="24" height="24" className="h-6 w-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 16H12.01M12 8V12V8Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button className="mt-2 rounded-full bg-gray-100">
        <img className="h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/35387401?v=4" alt="" />
      </button>
    </div>
  </aside>

<MainContentComponent membershipData={membershipData}/>
</div>
    )
};


export default LeftbarBoxComponent;