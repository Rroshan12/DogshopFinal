const carts = (carts=[],action)=>{

    switch(action.type){
        case "ADD":
      return [...carts, action.payload];
    case "REMOVE":
      const newArr = [...carts];
      newArr.splice(action.index, 1);
      return newArr;
    default:
       return carts;

           
    }
    
}

export default carts;