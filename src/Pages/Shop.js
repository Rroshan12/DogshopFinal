import React,{useState} from 'react'
import Filter from '../components/Filter/Filter'
import ShopItem from '../components/Shop/ShopItem'
import AddProduct from '../components/Add/AddProduct'
import Cart from '../components/cart-item/Cart'
import './shop.style.scss'
import firebase from '../firebase/config'


function Shop({user}) {
    const [search,setSearch]=useState('');

    

    return (

        <div className="scafold">
            <div className="filter">
                <Filter changeWord={ search => setSearch(search)} />

            </div>
            <div className="product">
                <ShopItem search={search}  user={user}/>
                

            </div>
             <div className="sidebar">

            <div className="cart-item">
                 <Cart />

               
                     
                 </div>

                
             <div className= "addProduct">
                 {user==`${process.env.REACT_APP_ISADMIN}`? <AddProduct/>:''}

                 
       
                 </div>

             </div>
         
              
           

          

          
        </div>
    )
}

export default Shop
