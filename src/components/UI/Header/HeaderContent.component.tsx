import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/static/app_logo.png';
import { BungieMembershipDataContext } from '../../../App';
import './Header.css';





const HeaderContentComponent: React.FC = () => {

    const bungieMembershipData = useContext(BungieMembershipDataContext);
    const [membershipData, setMembershipData] = useState<any>();
    useEffect(() => {
        if (bungieMembershipData) {
            setMembershipData(bungieMembershipData);
        }
    }
        , [bungieMembershipData])

    return (
        
            <div id="header_div">
                <div id="logo_div">
                    <Link to="/"><img src={logo} id="logo_pic" /></Link>
                </div>
                <br></br>

                <h2>{membershipData?.Response?.bungieNetUser?.displayName}</h2>
                <div id="membership_pic_div">
                   {membershipData?.Response?.bungieNetUser?.profilePicturePath && <img src={`https://www.bungie.net/${membershipData?.Response?.bungieNetUser?.profilePicturePath}`} /> }
                </div>




                {/* <div id="avatar_div"><div id="letters_div"><img src={letter_e} id="letter_e"/></div><Link to="/userinfo"><img src={avatar} id="avatar_pic"/></Link><br></br><a href="#loginScreen"><img src={login} id="login_pic"/></a></div>      */}

            </div>

        
    )
};


export default HeaderContentComponent;