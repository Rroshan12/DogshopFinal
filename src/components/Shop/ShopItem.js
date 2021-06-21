import React,{useContext} from 'react'
import {ProductsContext} from "../../context/product.context"
import "./shop-item.scss"
import {useDispatch} from "react-redux"
import { addToCart } from '../../actions/cart'
import {firestore} from "../../firebase/config"

function ShopItem({search,user}) {
   
    const {products}  = useContext(ProductsContext);
    const dispatch = useDispatch()

   function deleteProduct(id){

        firestore.collection("Products").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            window.location.reload(true);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })

       

    }

    return (
        <>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
{products.filter((val)=>{
  if(search==""){
    return val;
  }
  else if(val.ProductName.toLowerCase().includes(search.toLocaleLowerCase()))
  {
    return val.ProductName.toLowerCase().includes(search.toLocaleLowerCase());


  }  


  else{
    return null;
  }

}).map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                             {product.ProductPrice.toLocaleString("en", {
                style: "currency",
                currency: "USD"
              })}
                        </div>
                        {user==`${process.env.REACT_APP_ISADMIN}`? <button onClick={(e)=>deleteProduct(product.ProductID)} className='addcart-btn' >Delete</button> : ''}
                        {user==`${process.env.REACT_APP_ISADMIN}`? '':<button className='addcart-btn' onClick={()=>dispatch(addToCart(product))}>ADD TO CART</button> }
                        
                       
                    </div>
                    
                ))}
            </div>
        </>
    )
}

export default ShopItem
