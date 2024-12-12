import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/Users/diana/Desktop/Foodie Project/client/src/Login.css";

const initialValue = {
    email: "",
    password: "",
};

function Login () {
    let navigate = useNavigate();
    const [userData, setUserData] = useState(initialValue);

    function handleChange (e) {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value });
    }
  
   async function handleLogin (e) {
        e.preventDefault();
        try {
            let newUser = {
                email: userData.email,
                password: userData.password,
            };
            console.log(newUser);
        let res = await axios.post(
            "http://localhost:8000/users/login", 
            newUser
        );
        console.log(res.data)

        if (res.data.status){ //  if this condition is true, please navigate to "restaurants"
            localStorage.setItem("auth-token", res.data.token);
        }
        navigate("/restaurants");

        } catch (error) {
        console.log(error);
    }
}

    return (
        <div className = "login-page">
            <div className="login-box">
            <h1>Login</h1>
            <form onSubmit= {handleLogin}>
                <input 
                type = "email" 
                placeholder="email"
                value={userData.email} 
                name="email" 
                onChange={handleChange}/>

                <input 
                type = "password" 
                placeholder= "password"
                value={userData.password} 
                name="password" 
                onChange={handleChange}/>

                <input type = "submit" value="Submit" className="login-button"/>
            </form>
            </div>
            
        </div>
    );
}

export default Login;