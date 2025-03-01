import React, { useState } from 'react';
import Axios from 'axios';

const LoginComponent: React.FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (event: any)=>{
        event.preventDefault();
        console.log("Sent form info to Servlet");
        Axios.post("", {username, password})
        .then((res: { data: object; }) => console.log(res.data))
    }

    return(
        <div className ="main_area_div">
            <h3 className="area_header">Login Component</h3>
            Username: <input type="text" name="username" value = {username} onChange={(event) => setUsername(event.target.value)}/><br/>
            Password: <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/><br/>
            <input type="submit" value="Login" onClick={submit}/>
        </div>
        
    )
};


export default LoginComponent;