import React ,{useState}from 'react'
import './loging.style.scss'
import { auth, signInWithGoogle } from '../../firebase/config'
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'




function Login() {
    const {currentUser} = useSelector((state)=>state.users);
   const history = useHistory();
  
    const[user,setUser]=useState({
        email:'',
        password:''
    })

  

  const handelSubmit=  async e =>{
       e.preventDefault();

       const {email,password}=user;
       
       try{
           await auth.signInWithEmailAndPassword(email,password);
           setUser({       email:'',
           password:''});
       }
       catch(error){
           alert(error.message);
       }

    }
    return (
      
        <div className="login-wrap">

          <h1>Login</h1> 
            <form  className="login-form" onSubmit={handelSubmit}>



<input placeholder="email" type="text" name="email" onChange={(e)=>setUser({...user,email:e.target.value})} />
<input  placeholder="password" type="password" name="password"  onChange={(e)=>setUser({...user,password:e.target.value})}/>


<button className="btn"   >{currentUser? history.push("/"): ''}signin</button> 
         
         
            <button  className="btn" onClick={signInWithGoogle}> {currentUser? history.push("/"): ''} Google Signin</button>

            
            </form>
          
        </div>
    )
}

export default Login
