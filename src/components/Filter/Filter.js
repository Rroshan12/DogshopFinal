import React from 'react'
import './filter.style.scss'

function Filter({changeWord}) {
    return (
        <>
            
        <select className="cssoption"  name="category" onChange={(e)=>changeWord(e.target.value)}>
         <option value="">Category</option>
         <option value="dog">Dogs</option>
         <option value="cat">Cat</option>
         
         </select>
        </>
    )
}

export default Filter
