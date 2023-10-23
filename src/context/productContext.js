import { useContext, useState, useEffect, useReducer  } from "react";
import { ToastContainer, toast } from 'react-toastify';

import {
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import { db } from "../firebase";
// creating the context
const ProductContext = createContext();

// to consume the context
export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  // fetch the products from the api
  useEffect(() => {
    try {
        setLoading(true);
        fetch("https://fakestoreapi.com/products/")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            // console.log(data);
            setLoading(false);
          });
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
  }, []);

  // load users cart and orders from firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
            handleCart(user);
            handleOrders(user);
        } catch (error) {
          console.log(error);
        }
      } else {
        // No user is signed in.
        console.log("User is not logged in.");
      }
    });

    return () => {
      // Unsubscribe from the observer when the component is unmounted.
      unsubscribe();
    };
  }, []);

  const addToCart = async (product) => {
    if(auth.currentUser){
          product.quantity = 1;
    const cartRef = doc(db, "carts", cart.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(cartRef, {
        products:  arrayUnion(product)
        // products: {...cart.products, product}
      });
      
      toast.success('Product added to cart!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      toast.warn('You need to login !', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  };


const updateCart = async (updatedProducts) => {
  const cartRef = doc(db, "carts", cart.id);
  try {
    // Check if the updatedProducts object has a valid 'products' field
    if (updatedProducts) {
      // Update the 'products' field with the new data
      await updateDoc(cartRef, {
        products: updatedProducts,
      });
      console.log("Product updated in the cart");
    } else {
      console.error("Invalid or missing 'products' field in updated data.");
    }
  } catch (error) {
    console.error("Error updating the cart:", error);
  }
};



  const addOrder = async (order) =>{
    const orderRef = doc(db, "orders", orders.id);
    try {
      // Check if the updatedProducts object has a valid 'products' field
      if (order) {
        // Update the 'products' field with the new data
        await updateDoc(orderRef, {
          orders: arrayUnion(order),
        });
        toast.success('Order placed successfullly!', {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        console.error("Invalid or missing 'order' field in updated data.");
      }
    } catch (error) {
      console.error("Error updating the order:", error);
      toast.error('Error placing order!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleCart = (user)=>{
    const cartRef = collection(db, "carts");
          const query1 = query(cartRef, where("userId", "==", user.uid));

          getDocs(query1).then(async (snapshot) => {
            if (snapshot.size > 0) {
              // A document with the specified userId exists in the "carts" collection
            //   console.log("cart exists");
            } else {
              // No document with the specified userId exists
              // Add a new document with a generated id
              const cartRef = doc(collection(db, "carts"));

              // later...
              await setDoc(cartRef, { userId: user.uid, products:null});
              console.log("cart does not exist new created");
            }
          });

          //  get realtime updates on cart
          const unsub = onSnapshot(
            query(collection(db, "carts"), where("userId", "==", user.uid)),
            (snapshot) => {
              let cart = null;

              cart = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
              });
              setCart(cart[0]);
            }
          );

          return () => unsub();
}

const handleOrders= (user)=>{
    const orderRef = collection(db, "orders");
          const query1 = query(orderRef, where("userId", "==", user.uid));

          getDocs(query1).then(async (snapshot) => {
            if (snapshot.size > 0) {
              // A document with the specified userId exists in the "carts" collection
            //   console.log("orders doc exists");
            } else {
              // No document with the specified userId exists
              // Add a new document with a generated id
              const cartRef = doc(collection(db, "orders"));

              // later...
              await setDoc(cartRef, { userId: user.uid , orders:null});
              console.log("orders doc  does not exist new created");
            }
          });

          //  get realtime updates on cart
          const unsub = onSnapshot(
            query(collection(db, "orders"), where("userId", "==", user.uid)),
            (snapshot) => {
              let orders = null;

              orders = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
              });
              setOrders(orders[0]);
              // console.log(orders[0]);
            }
          );

          return () => unsub();
}




  const value = {
    loading,
    products,
    cart,
    orders,
    setCart,
    addToCart,
    updateCart,
    addOrder
  };

  // console.log(value);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;


