import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

function Navbar(){
    const {user, isLoggedIn, logout} = useUserContext();
    // console.log(user);

    return(
        <div>
            <div className={styles.navbar}>
            <Link to="/"><div className={styles.title}>Busy Buy</div></Link>
            
            <div className={styles.linksContainer}>
                {/* {console.log(user)} */}
                    {isLoggedIn ? 
                    <>
                        <Link to="/orders" ><div>
                        <img width="48" height="48" src="https://img.icons8.com/fluency/48/purchase-order.png" alt="purchase-order"/>
                        <span>ORDERS</span></div></Link>
                        <Link to="/cart"><div>
                        <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/shopping-cart.png" alt="shopping-cart"/>
                       <span> CART </span></div></Link>
                        <Link to="/" onClick={logout}><div>
                        <img width="50" height="50" src="https://img.icons8.com/fluency/48/exit--v1.png" alt="exit--v1"/>
                        <span>SIGN OUT</span></div></Link>
                        
                    </>
                     :  <Link to="/login"><div>
                        <img width="50" height="50" src="https://img.icons8.com/fluency/48/login-rounded-right.png" alt="login-rounded-right"/>
                       <span> SIGN IN </span></div></Link>}
                
            </div>
        </div>

        <Outlet />
       
        </div>
        

    )
}

export default Navbar;