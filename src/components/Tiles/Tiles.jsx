import React from 'react';
import './Tiles.css';

/*pass classname as props and use it in tiles as classname
using template literals`${}` */
const Tiles = ({ className, value, onClick, playerTurn }) => {
    let hoverNextPlayerSymbol = null;
    if(value === null && playerTurn !== null){
        hoverNextPlayerSymbol = `${playerTurn.toLowerCase()}-hover`;   //css classname x-hover
    }
    return (
        <div onClick={onClick} className={`tiles ${ className } ${hoverNextPlayerSymbol}`}>
            { value }
        </div>
    )
}

export default Tiles;