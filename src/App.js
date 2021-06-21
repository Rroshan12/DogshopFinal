import React ,{Component}from 'react'
import './App.css';
import Home from  './Pages/Home'
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import {Switch,Route} from 'react-router-dom'
import Shop from "./Pages/Shop"
import Login from './components/Login/Login';
import  {auth,createUserProfileDocument} from './firebase/config'
import { connect} from 'react-redux';
import { setCurrentUser } from './actions/user';
import Checkout from './components/checkout/Checkout';
import Order from './components/Orders/Order';


class App extends Component {

  authListener = null;

  state = {
    user: null,
}
 

  
 
  

  componentDidMount(){
    const {setCurrentUser} = this.props;


    this.authListener = auth.onAuthStateChanged( async userAuth =>{

      
      if(userAuth){
        const useRef = await createUserProfileDocument(userAuth);
        useRef.onSnapshot(snapShot =>{
         
          setCurrentUser({
            
            currentUser:{
              id:snapShot.id,
              
              ...snapShot.data()
            }
            
          })
          this.setState({
            user:snapShot.data().displayName
  
          })
         
        
        })
        
      
      }
      setCurrentUser(userAuth);
  
      
   
    })

  

    





  }
  componentWillUnmount(){
    this.authListener();

  }


render(){
  

  return (
    <>
    <Header user={this.state.user}  />
   <Switch>
 
    <Route exect path= '/orders' >
    <Order user={this.state.user} />
  </Route>

   

   <Route exect path="/checkout" >
     <Checkout />
   </Route>

   <Route exect path="/login" >
     <Login/>
   </Route>
     
   <Route exect path="/register" >
     <Register />
     </Route>
     <Route path= "/shop">
       <Shop user={this.state.user} />

     </Route>
     <Route exact path="/" >
     <Home />
     </Route>
   </Switch>
   </>
      
   
  );

}
  
}



const mapDispatchToProps = dispatch =>({
  setCurrentUser: user =>dispatch(setCurrentUser(user))
 
})


export default connect(null,mapDispatchToProps)(App);
