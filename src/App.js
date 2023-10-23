import logo from './logo.svg';
import './App.css';
import { createBrowserRouter,createRoutesFromElements, RouterProvider ,Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Orders from './components/orders/Orders';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import {useUserContext} from "./context/userContext";
import { Navigate } from "react-router-dom";



function App() {

      const {isLoggedIn}  = useUserContext();

    const protect = (element)=>{
      if(!isLoggedIn){
        return <Navigate replace to="/" />;
      }else{
        return element;
      }
    }

    const routes = createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={protect(<Orders />)} />
          <Route path="/cart" element={protect(<Cart />)} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    );



    const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
