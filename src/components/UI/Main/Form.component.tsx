import axios from "axios";
import React, { useEffect, useState } from "react";




const FormComponent: React.FC = () => {

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
   



    const submit = (event: any) => {
        event.preventDefault();
        axios.post("http://192.168.1.4:9998/thing/create", {
            name: name,
            color: color
        }).then((res: { data: any; })  => console.log(res.data))
        window.alert(name + color + " saved");

    }


    useEffect(() => {

    }, []);


    return (
        <div>

            <form onSubmit={submit}>
                <label>
                    Name:
          <input type="text" id="name" name="name" onChange={(event) => setName(event.target.value)} value={name} /><br />
                    <label>
                        Color:
          </label>
                    <input type="text" id="color" name="color" onChange={(event) => setColor(event.target.value)} value={color} /><br />




                    {/* <select 
          value = {gConsole} 
          onChange={(event) => {setgConsole(event.target.value); console.log(gConsole)}} > 
          <option value="Sega">Sega Genesis</option>
            <option value="N64">Nintendo 64</option>
          </select><br /> */}

                    <input type="submit" value="Save" onClick={submit} />

                </label>

            </form>

        </div>
    )

};

export default FormComponent;

