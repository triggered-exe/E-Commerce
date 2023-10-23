import React from 'react'
import { useProductContext } from '../../context/productContext'
import styles from './Orders.module.css'
function Orders() {
  const {orders} = useProductContext()
  if(!orders.orders || orders.orders.length === 0){
    return <h1>No Orders Yet</h1>
  }
  return (
    <div>
      
      {
       
        orders.orders.map(order => {
         return (

          <table>
            <caption><h2>Ordered On : {order.date}</h2></caption>
          <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
          </tr>
          {
            order.products.map((item)=>{
             return (
              <tr>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
             )
            })
          }

      </table>
         )
        })
        
      }
    </div>
  )
}

export default Orders
