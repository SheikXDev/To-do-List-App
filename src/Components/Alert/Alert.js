import React from 'react';
import "../Alert/Alert.css";

export default function Alert(props) {
    const { message } = props;

    return (
        <>
            <div className='alert-cntd'>
                <h2>{message}</h2>
            </div>
        </>
    )
}



