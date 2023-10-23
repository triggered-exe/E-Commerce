import {React, useEffect, useState} from 'react'
import { useProductContext } from '../../context/productContext'
import styles from './Cart.module.css'
function Cart() {
  const [total , setTotal] = useState(0);
  const {cart, addOrder, setCart,updateCart} = useProductContext()

  

  useEffect(()=>{
    if(!cart.products) return;
    const totalCartPrice = cart.products.reduce((total, product) => total + (product.price * product.quantity), 0);
    setTotal(totalCartPrice);
  },[cart])

  // Define the handleDecreaseQuantity function
const handleDecreaseQuantity = (index) => {
  // Make sure index is within valid range
  if (index >= 0 && index < cart.products.length) {
    const updatedProducts = [...cart.products];
    updatedProducts[index].quantity -= 1;
    
    // You should also handle the case where the quantity reaches 0 and remove the product if needed
    if (updatedProducts[index].quantity <= 0) {
      updatedProducts.splice(index, 1);
      console.log(updatedProducts);
    }
    setCart({ products: updatedProducts });
    updateCart(updatedProducts);
  }
};

// Define the handleIncreaseQuantity function
const handleIncreaseQuantity = (index) => {
  // Make sure index is within valid range
  if (index >= 0 && index < cart.products.length) {
    const updatedProducts = [...cart.products];
    updatedProducts[index].quantity += 1;
    setCart({ products: updatedProducts });
    updateCart(updatedProducts);
  }
};

const placeOrder = () => {
 
  // Place an order
  if(!cart.products || cart.products.length === 0)return;

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  console.log(formattedDate); // Output: "2023-10-21"
  const order = {
    date:formattedDate,
    products: cart.products,
    total: total
  }
  addOrder(order);
  // clear the cart
  setCart({ products: [] });
  updateCart([]);

  console.log("Order placed!");
};

  console.log(cart);



  return (

    <div className={styles.productContainer}>
     
   
     <div className={styles.cartHeader}>
          <div className={styles.title}> <b>title</b> </div>
          <div className={styles.quantity}> <b>quantity</b></div>
          <div  className={styles.price}> <b>price</b></div>
      </div>
      {
      cart.products &&  cart.products.map((product, index) => {
      return (
        <div className={styles.product} key={product.id}>
              <div className={styles.title}> {product.title} </div>
              <div className={styles.quantity}> {product.quantity}
              <div className={styles.quantityButtons}>
                  <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                  <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </div>
              </div>
             <div  className={styles.price}> ₹ {product.price} </div>
        </div>
      )
      }
      )
     }

     <div className={styles.checkoutContainer}>
      <div className={styles.total}>Total: {total}</div>
      <div onClick={placeOrder} className={styles.placeOrder}>Place Order</div>
     </div>
      
    </div>
  )
}

export default Cart;
 