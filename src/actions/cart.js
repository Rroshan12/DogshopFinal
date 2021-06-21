export const addToCart = item =>({
    type: 'ADD',
    payload:item
    
    
})

export const removeFromCart = id =>({
    type: 'REMOVE',
    payload:id
    
    
})
