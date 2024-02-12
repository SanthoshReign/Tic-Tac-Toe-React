import React from 'react';
import './Strike.css';

function Strike({ strikeWinner }) {
    return ( 
        <div className={`strike ${strikeWinner}`}>
            
        </div>
    );
}

export default Strike;