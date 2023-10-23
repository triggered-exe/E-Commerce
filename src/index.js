import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './context/userContext';
import ProductContextProvider from './context/productContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

    <UserContextProvider>
      <ProductContextProvider>
        <App />
        <ToastContainer />
      </ProductContextProvider>
    </UserContextProvider>
    
   
  </>
);

