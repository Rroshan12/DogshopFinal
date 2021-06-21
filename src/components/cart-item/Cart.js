import React from 'react'
import {useSelector} from "react-redux"
import './cart.style.scss'
import {useDispatch} from 'react-redux'
import { removeFromCart } from '../../actions/cart'
import Button from '../Button/Button'
import {useHistory} from 'react-router-dom'

function Cart() {
    const dispatch = useDispatch()
   const cartitem= useSelector(state => state.carts)
   const {currentUser}= useSelector(state => state.users)
   const history = useHistory();
   
    return (
        <div className="scafoldcart">
          {
              cartitem.map(item=>(
                
              <div className="wrap">
                <img  className="image" src={item.ProductImg}/>
                <span className="name">{item.ProductName}</span>
                <span className="name">{item.ProductPrice.toLocaleString("en", {
                style: "currency",
                currency: "USD"
              })}</span>
                <button  className="btn1" type="submit" onClick={()=> dispatch(removeFromCart(item.ProductId))}>Delete</button>
            


              </div>
              
             
                
                   

              ))
          }

          {
              cartitem.length >0 ? <button  onClick={()=> history.push(currentUser ? "/checkout":"/register")  }>checkout</button>:''
          }
                
          
        </div>
    )
}

export default Cart
