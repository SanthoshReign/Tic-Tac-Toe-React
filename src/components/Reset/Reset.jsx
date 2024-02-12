import React from 'react';
import './Reset.css';
import GameState from '../GameOver/GameOver';

function Reset({gameState, onReset}) {
    if(gameState === GameState.InProgress){
        return;
    }
    return ( 
        <button className="resetButton" onClick={onReset}>
            Play Again!!
        </button>
    );
}

export default Reset;