import React,{useState} from 'react'
import './register.style.scss'
import Button from '../Button/Button'
import {auth,createUserProfileDocument} from "../../firebase/config"
import {useHistory} from "react-router-dom"

function Register() {

    const history = useHistory();

    const [userdata, setUserData]= useState({
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    

   const  handelSubmit=async e =>{
        e.preventDefault();
        const {displayName,email,password,confirmPassword}=userdata;
        if(password!== confirmPassword ){
            alert("password not matched ");
            return
        }
        if( password.length < 6){
            alert("password should be greter that 6 character ");
            return

        }

        try{
            const{user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});

            setUserData({
                displayName:'',
             email:'',
        password:'',
        confirmPassword:''
 
        
            })

            history.push("/shop")

            
        }
        catch(error){
            console.log(error)

        }


       
    }

    return (
        <div className="register-wrap">

            <h1>Register</h1>

            <form  className="register-form" onSubmit={handelSubmit}>

          <input type="text"  placeholder="displayname" name="displayname" onChange={(e)=>setUserData({...userdata,displayName:e.target.value})} />

          <input type="text"  placeholder="Email" name="email" onChange={(e)=>setUserData({...userdata,email:e.target.value})} />
          <input type="password"   placeholder="Password" name="password"  onChange={(e)=>setUserData({...userdata,password:e.target.value})}/>
          <input type="password"   placeholder="Confirm Password" name="confirmpassword"  onChange={(e)=>setUserData({...userdata,confirmPassword:e.target.value})}/>
            <Button  className="register-btn">Register</Button>
            </form>
            
          
        </div>
    )
}

export default Register
