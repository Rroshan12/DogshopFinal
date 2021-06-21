import React,{useState} from 'react'
import './checkout.style.scss'
import {firestore} from '../../firebase/config'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Checkout() {
    const history= useHistory();
    const cartitem= useSelector(state => state.carts)
    const {currentUser}= useSelector(state => state.users)
    console.log(cartitem);
    const totalmoney = cartitem.reduce((total, b) => total + b.ProductPrice, 0)
    console.log(totalmoney);
    const productid=[];
    const[order,setOrder] = useState({
        name:'',
        email:'',
        phonenumber:'',
        totalprice:0

    })
  

 const handelSubmit = async (e)=>{

    {
        cartitem.map(item=>(
            productid.push(item.ProductID)
        ))
    }
    console.log(productid);

       e.preventDefault();
       await  firestore.collection('Orders').add({
        Name: order.name,
        Email: order.email,
        Phonenumber: Number(order.phonenumber),
        ProductId:productid,
        TotalPrice: totalmoney,
        Deliver:false
    }).then(() => {
        setOrder({
            name:'',
            email:'',
            phonenumber:''
        });
        window.location.reload(true);
    
    });

    alert("your order is placed")
    history.push("/")

    }
   
    return (
        <>

        {currentUser ?
        <div className ="checkout-scafold">

            <h1>Your total Price</h1>
             <p>{totalmoney.toLocaleString("en", {
                style: "currency",
                currency: "USD"
              })}</p>
            <form className="cform" onSubmit={handelSubmit}>
            <input type="text" placeholder="name" onChange={(e)=>setOrder({...order,name:e.target.value})} />
              <input type="text" placeholder="email" onChange={(e)=>setOrder({...order,email:e.target.value})}/>
              <input type="number" placeholder="phonenumber" onChange={(e)=>setOrder({...order,phonenumber:e.target.value})}/>
              <button className="c-btn" type="submit">Cash Delivery</button>
              <button className="c-btn" >Pay now</button>

            </form>
             

            
        </div>
        : ''}
        </>
    )
}

export default Checkout
