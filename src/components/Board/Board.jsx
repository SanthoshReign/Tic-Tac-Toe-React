import React from 'react';
import './Board.css';
import Tiles from '../Tiles/Tiles';
import Strike from "../Strike/Strike";

const Board = ({ tiles, onTileClick, playerTurn, strikeWinner}) => {

    return (
        <div className="board">
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(0)}}  
                value={tiles[0]} 
                className='borderBottom borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(1)}} 
                value={tiles[1]} 
                className='borderBottom borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(2)}} 
                value={tiles[2]} 
                className='borderBottom'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(3)}} 
                value={tiles[3]} 
                className='borderBottom borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(4)}} 
                value={tiles[4]} 
                className='borderBottom borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(5)}} 
                value={tiles[5]} 
                className='borderBottom'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(6)}} 
                value={tiles[6]}
                className='borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(7)}} 
                value={tiles[7]} 
                className='borderRight'
            />
            <Tiles 
                playerTurn = {playerTurn}
                onClick={() => {onTileClick(8)}} 
                value={tiles[8]} 
            />
            <Strike strikeWinner={strikeWinner}/>
        </div>
    )
}

export default Board;