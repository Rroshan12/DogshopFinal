import React ,{useContext}from 'react'
import { OrdersContext } from '../../context/order.context';
import './order.style.scss'
import firebase ,{firestore }from '../../firebase/config';
import { ProductsContext } from '../../context/product.context';

function Order({user}) {

    function writeData(OrderID,DeliveryStatus) {
        firestore.collection('Orders').doc(OrderID).update({Deliver: !DeliveryStatus}).then(()=>{
            window.location.reload(true);
        });
        
      }

    const {orders}  = useContext(OrdersContext);
    const {products} = useContext(ProductsContext)

    

    return (
<div className="order-tabel">
 {
        user==`${process.env.REACT_APP_ISADMIN}`?

<table>
  <tr>
    <th>customer-name</th>
    <th>Order-ID</th>
    <th>email</th>
    <th>Deliverystatus</th>
    <th>Phonenumber</th>
    <th>TotalPrice</th>
    <th >Order-items</th>
    

  </tr>
  {orders.map(item=>(

<tr>
<th>{item.PersonName}</th>
<th>{item.OrderID}</th>
<th>{item.PersonEmail}</th>
<th>{item.DeliveryStatus ? <button onClick={(e)=>writeData(item.OrderID,item.DeliveryStatus)} >Delivered</button>: <button onClick={(e)=>writeData(item.OrderID,item.DeliveryStatus)}>Deliver</button> }</th>
<th>{item.Phonenumber}</th>
<th>{item.TotalPrice}</th>
<th className="order-th">   {item.ProductID.map(val =>(

products.map(order =>{
if(order.ProductID==val){
  return <><p>{order.ProductName}</p><p>{order.ProductPrice}</p> <img className="order-img" src={order.ProductImg} /></>
}
})



)
)} </th>


</tr>

    ))}
  
</table>
:''
 }

        
 </div>
     
        
    )
}

export default Order
