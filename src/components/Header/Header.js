import React from 'react'
import "./header.style.scss"
import Logo from "../../asset/crown.png"
import DogLogo from "../../asset/doglogo.png"
import {Link} from "react-router-dom"
import {auth} from '../../firebase/config'
import {useSelector} from 'react-redux';

function Header({user}) {
    const {currentUser} = useSelector((state)=>state.users);
  
    const cartitem= useSelector(state => state.carts)

    function handelSubmit(){
        auth.signOut();
        window.location.reload(true);
    }
 
    return (

        <div className="header">
            <div className="media">
                <Link to="/">
                <img  className="media-item" src={Logo} />
                <img  className="media-item" src={DogLogo} />

                </Link>
           
            </div>

            <div className="navs">
                 <h1>Dogs and Cat shop </h1>
                <li><Link  className="link" to="/shop">Shop</Link> </li>

                
                <li><Link  className="link" to="/register"> {
                        currentUser ? '': 'Register'
                    }</Link> </li>
                <li><Link  className="link" to="/login" >

                    {
                        currentUser ? <span onClick={handelSubmit}>Logout</span>: <span>Login</span>
                    }
                    
                    
                    </Link> </li>

                    <li>
                  {
                      user==`${process.env.REACT_APP_ISADMIN}` ? '':   <span>Cart {cartitem.length}</span>

                  }
                  
                 
                    </li>
                    <>

                    {
                      currentUser?  <li>Hello {user} </li>:''

                  }
                  </>
                  

                    
                 
                  
                   

                   
              
            </div>
           
        </div>
    )
}


export default Header
