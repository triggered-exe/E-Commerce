import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// creating the context
const UserContext = createContext();

// to consume the context
export const useUserContext = () => {
    return useContext(UserContext);
}

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Use Firebase's onAuthStateChanged to listen for user changes
        // user passed is done by firebase from local storage
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in.
            setUser(user); // Update the user state with the authenticated user
            setIsLoggedIn(true); // Update the login status to true
          } else {
            // User is signed out.
            setUser(null); // Clear user data
            setIsLoggedIn(false); // Update the login status to false
          }
        });
    
        return () => unsubscribe(); // Unsubscribe when the component unmounts
      }, []);
    

    const login = (event) => {
        setLoading(true);
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        toast.success('Login Successfull!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setUser(user);
        setIsLoggedIn(true);

         setLoading(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
        });
        

    }

    const logout = () => {

        const auth = getAuth();
        signOut(auth).then(() => {
            setUser({});
            setIsLoggedIn(false);
            toast.success('SignOut Successfull!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).catch((error) => {
        // An error happened.
        });
    }



    // to signup
     const auth = getAuth();

    const signup = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setUser(user);
            setIsLoggedIn(true);
            toast.success('SignOut Successfull!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.success(errorMessage, {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // ..
        });
    }

    const value = {
        user,
        email,
        setEmail,
        password,
        setPassword,
        isLoggedIn,
        signup,
        login,
        logout
    }

    return (
    <UserContext.Provider value={value}>
            {children}
    </UserContext.Provider>
            )
     }


export default UserContextProvider;