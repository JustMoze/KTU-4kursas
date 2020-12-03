import React from 'react';
import ReactLoading from 'react-loading';


export default function Loader({size = 40}) {
    return (
        <ReactLoading type="spin" color='#c80f2e' height={size} width={size} />
    )
}

