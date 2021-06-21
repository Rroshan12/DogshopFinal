const users = (users=[{currentUser:null}],action)=>{

    switch(action.type){
        case 'SET_CURRENT_USER':
            return  {...users, currentUser:action.payload};

            
           
                
        default:
            return users;

           
    }
    
}

export default users;