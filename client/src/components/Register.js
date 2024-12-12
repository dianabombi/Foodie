import React from "react";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/Users/diana/Desktop/Foodie Project/client/src/components/Register.css";

const initialValue = {
    userName: "",
    email: "",
    password: "",
};

function Register () {
    let navigate = useNavigate();
    const [userData, setUserData] = useState(initialValue);

    function handleChange (e) {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value });
    }
  
   async function handleRegister (e) {
        e.preventDefault();
        try {
            let newUser = {
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
            };
        let res = await axios.post(
            "https://foodie-s5wq.onrender.com/users/register", 
            newUser
        );
        alert(res.data.msg);
        navigate("/login");
        } catch (error) {
        console.log(error);
    }
}

    return (
        <div className="register-form">
            <h1>Sign up</h1>
            <form onSubmit= {handleRegister}>
                <input 
                className="register-input-field"
                type = "text" 
                placeholder="userName"
                value={userData.userName} 
                name="userName" 
                onChange={handleChange}/>

                <input 
                className="register-input-field"
                type = "email" 
                placeholder="email"
                value={userData.email} 
                name="email" 
                onChange={handleChange}/>

                <input 
                className="register-input-field"
                type = "password" 
                placeholder= "password"
                value={userData.password} 
                name="password" 
                onChange={handleChange}/>

                <input type = "submit" value="Register" className="register-button" />
            </form>
        </div>
    );
}

export default Register;