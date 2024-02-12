import React from 'react';
import './GameOver.css';
import GameState from './GameOver.js';

function GameOver({gameState}) {
    switch (gameState) {
        case GameState.InProgress:
            return <></>
        case GameState.PlayerXWins:
            return <div className="gameOver">Player X Wins</div>
        case GameState.PlayerOWins:
            return <div className="gameOver">Player O Wins</div>
        case GameState.Draws:
            return <div className="gameOver">Draw!! No one wins</div>
        default:
            return <></>
    }
}

export default GameOver;