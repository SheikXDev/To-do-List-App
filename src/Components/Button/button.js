import React from 'react'
import "./button.css"

export default function Button(props) {

    const { btnName, byClick } = props;

    return (
        <div>
            <button className='btn' onClick={byClick}>{btnName}</button>
        </div>
    )
}
