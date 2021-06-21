import React from 'react'
import ShopDogs from '../../asset/dog.png'
import ShopCats from '../../asset/cat.png'
import './directory.style.scss'
import {useHistory} from 'react-router-dom'

function Directory() {
    
    const history = useHistory()

    return (
        <div className="scafold">
            <div className="menu-items">
                <div  style={{
                  backgroundImage: `url(${ShopDogs})`

                }} className="item">
                   

                    

                    </div>
                    <button  onClick={(e)=> history.push("/shop") } className="btn" type="submit">
                        Shop Dogs
                    </button>

                    </div>
         <div className="menu-items">
            <div style={{
                  backgroundImage: `url(${ShopCats})`

                }}className="item">
                     

                </div>
                <button onClick={(e)=> history.push("/shop") } className="btn" type="submit">
                        Shop Cats
                    </button>


            </div>
                
                
            
            
        </div>
    )
}

export default Directory
