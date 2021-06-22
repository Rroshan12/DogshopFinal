export const addToCart = (item) =>({
    type: 'ADD',
    payload:item
    
    
})

export const removeFromCart = index =>({
    type: 'REMOVE',
    payload:index
    
    
})
