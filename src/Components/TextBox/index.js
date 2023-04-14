import React from 'react'
import './indexStyleText.css'

export default function TextBox(props) {
    const { textValue, onChange } = props;



    return (
        <div className='text-box'>
            <input type={"text"} value={textValue} onChange={onChange} placeholder="Add Your List Here..." />

        </div>
    )
}
