import {React, useEffect} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {useUserContext} from "../../context/userContext";
import styles from "./Login.module.css"
function Login(){

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
        <div className={styles.loginContainer}>
            <h1>sign in</h1>
            <form onSubmit={login}>
                <input type="email" 
                onChange={(e)=>{setEmail(e.target.value)}}placeholder="email" required/>
                <input type="password" 
                onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required/>
                <button>login</button>
            </form>
            <p>don't have an account? <Link to="/signup">sign up</Link></p>
        </div>
    )
}

export default Login;