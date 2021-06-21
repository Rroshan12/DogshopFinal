import React from 'react'
import './style.scss'

function Button({children}) {
    return (
        <div>
            <button  type="submit" className="btnc">{children}</button>
        </div>
    )
}

export default Button
