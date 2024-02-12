import React, { useEffect, useState } from "react";
import './TicTacToe.css';
import Board from "../Board/Board";
import GameOver from "../GameOver/GameOver.jsx";
import GameState from "../GameOver/GameOver.js";
import Reset from "../Reset/Reset.jsx";

/*import audio files*/
import clickSoundAsset from '../../sounds/click.wav';
import gameOverSoundAsset from '../../sounds/game_over.wav';

/*use audio in js is by creating an object on reference of Audio class*/
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.2;
const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.5;


const PLAYER_X = 'X';
const PLAYER_O = 'O';

/*winning combinations is an array of winning patterns objects*/
const winningCombinations = [
    //CHECKING ROWS
    {combo: [0,1,2], strikeWinner: "strike-row-1"},
    {combo: [3,4,5], strikeWinner: "strike-row-2"},
    {combo: [6,7,8], strikeWinner: "strike-row-3"},
    //CHECKING COLUMNS
    {combo: [0,3,6], strikeWinner: "strike-column-1"},
    {combo: [1,4,7], strikeWinner: "strike-column-2"},
    {combo: [2,5,8], strikeWinner: "strike-column-3"},
    //CHECKING BOTH DIAGONALS
    {combo: [0,4,8], strikeWinner: "strike-diagonal-left"},
    {combo: [2,4,6], strikeWinner: "strike-diagonal-right"}
];

function checkWinner(tiles, setStrikeWinner, setGameState){
    //"Object destructuring" is a technique used to grasp object values from an array or parent object
    //here we destructure the values combo and strikeWinner from winningcombination array
    for(const {combo, strikeWinner} of winningCombinations){
        const valueAtTile1 = tiles[combo[0]];
        const valueAtTile2 = tiles[combo[1]];
        const valueAtTile3 = tiles[combo[2]];

        //check each and every combination for winner everytime re-renders(tiles clicked)
        //checking same symbol with positions
        if(
            valueAtTile1 !== null &&
            valueAtTile1 === valueAtTile2 &&
            valueAtTile1 === valueAtTile3
        ){
            setStrikeWinner(strikeWinner);
            if(valueAtTile1 === PLAYER_X){
                return setGameState(GameState.PlayerXWins);
            }else{
                return setGameState(GameState.PlayerOWins);
            }
        }
    }

    const checkIfAllTilesFilledOrNot = tiles.every((tile) => tile !== null);
    if(checkIfAllTilesFilledOrNot){
        setGameState(GameState.Draws);
    }
    
}

const TicTacToe = () => {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeWinner, setStrikeWinner] = useState();
    const [gameState, setGameState] = useState(GameState.InProgress);

    function handleReset(){
        setGameState(GameState.InProgress);
        setTiles(Array(9).fill(null));
        setStrikeWinner(null);
        setPlayerTurn(PLAYER_X);
    }

    function handleClick(index) {
        /* restrict the user to click the tiles after the 
        result has been declared or in other word, if the InProgress
        state has changed it means the game is either win by someone or 
        it become draw so any of the two case we should stop the event 
        listener by exit from the function */
        if(gameState !== GameState.InProgress){
            return;
        }

        //if the tile is already choosen, then don't allow the tile to override again
        if(tiles[index] !== null){
            return;
        }
        // console.log(index);
        //spread operator is for retaining the previous values of an array
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        setPlayerTurn(playerTurn===PLAYER_X ? PLAYER_O : PLAYER_X);
    }

    //"useEffect" is a hook used for side code to execute on certain conditions
    //here it will check winning combination every time the user click the tiles 
    //that is why we used tiles as dependencies then only it will re-renders for tiles changes only, not on any other changes
    useEffect( () => {
        checkWinner(tiles, setStrikeWinner, setGameState);
    }, [tiles]);

    /* at below, the useEffect hook is used to run a side task i.e. every time we do some 
    changes in tiles (clicking tiles) will run this side code. This is because we have added
    tiles as dependency. Therefore, every time the useState 'tiles' re-renders, the side code
    in useEffect also runs.  Without dependencies , the side code in useEffect hook will run
    only once, no matter how many times any useState re-renders */
    useEffect(() => {
        //It will rise sound only if a tile is null or not filled. 
        if(tiles.some((tile) => tile !== null)){
            //'play' method is used to run the audio
            clickSound.play();
        }
    }, [tiles]);

    //next useEffect is used to play sound only when game overs.
    useEffect(() => {
        //The game will not be finished only in 'Inprogress' state
        if(gameState !== GameState.InProgress){
            gameOverSound.play();
        }
    }, [gameState]); /*run this side code only re-renders happens in useState 'gameState'*/
    
    return (
        <div className="tictactoe">                   
            <h1>Tic Tac Toe</h1>
            <Board 
                tiles={tiles} 
                onTileClick={handleClick} 
                playerTurn={playerTurn}
                strikeWinner={strikeWinner}
            />
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleReset}/>
        </div>
    )
}

export default TicTacToe;