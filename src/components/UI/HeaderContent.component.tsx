import React, {   useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/static/app_logo.png';
import { UserInformationContext } from '../../App';





const HeaderContentComponent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const membershipData = useContext(UserInformationContext);
    const [membershipData2, setMembershipData2] = useState<any>();
    useEffect(() => {    
        if(membershipData){
        setMembershipData2(membershipData);
        }
    }
        , [membershipData])

    return(
        <div>
            <div id="page_headline">
    <div id="logo_div">
        <Link to="/"><img src={logo} id="logo_pic" /></Link>
    </div>
    <br></br>

 <h2>{membershipData2?.Response?.bungieNetUser?.displayName}</h2>
 <div id="membership_pic_div">
     <img src={`http://www.bungie.net/${membershipData2?.Response?.bungieNetUser?.profilePicturePath}`}/>
 </div>

   
        

    {/* <div id="avatar_div"><div id="letters_div"><img src={letter_e} id="letter_e"/></div><Link to="/userinfo"><img src={avatar} id="avatar_pic"/></Link><br></br><a href="#loginScreen"><img src={login} id="login_pic"/></a></div>      */}
         
    </div>
    <hr id="main_hr"></hr>
    <div id="loginScreen">

    <div id="login_text">
        <a href="" className="cancel">&times;</a><br></br>
        <form>
            <h2>Sign in:</h2>
            <div id="signin_text">
                <span className="login_Username">Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                <a href="#registerScreen" id="register_link">Register</a><br></br>
                
            </div>
            <input type="text" name="username" placeholder="NotABot" value={username} onChange={(evt) => setUsername(evt.target.value)}/><br></br>
            <span>Password:</span><br></br>
            <input type="password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/><br></br>
            <input type="submit" value="Submit" ></input>
        </form>
    </div>
   <div id="cover"></div>
   </div>
        </div>
    )
};


export default HeaderContentComponent;