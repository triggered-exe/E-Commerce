import React, {useEffect} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {useUserContext} from "../../context/userContext";
import styles from "./Signup.module.css";

function Signup(){
    const {user, email, setEmail,password, setPassword, login, signup, isLoggedIn}  = useUserContext();
    // to redirect the login page to home if login is true
    const navigate = useNavigate();
    useEffect(() =>{
        if (isLoggedIn) {
            console.log("Redirecting to /home");
            navigate("/home");
         } 
      })

    return(
        <div className={styles.signupContainer}>
            <h1>Signup</h1>
            <form onSubmit={signup}> 
                {/* <input type="text" placeholder="Enter your name" /> */}
                <input type="email" value={email} 
                onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" required/>

                <input type="password" value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter your password" required/>
                <button>Signup</button>
            </form>
        </div>
    )
}

export default Signup;