import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const { username, setusername } = useState("");
  const { password, setpassword } = useState("");
  const { error, seterror } = useState("");
  const { navigate } = useNavigate("");
const handleRegister = async (e) =>{
    e.preventdefault();
    try{
        const res = await axios.post("https:/localhost:4000/api/users/register", {
            username,
            password,
        }) 

        if(res.status(200) || res.status(201)){
            alert('login succesful')
            navigate('/login')
        }
    }
    catch(err){
        seterror('invalid credentials');

    }
    
}
}
