import { useState, useEffect } from 'react'
import './App.css'
import { saveGameState, loadGameState } from './services/dbService';

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const savedGame = loadGameState();
    if (savedGame) {
      setSquares(savedGame.squares);
      setXIsNext(savedGame.xIsNext);
    }
  }, []);

  function handleClick(i) {
    if (squares[i]) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    saveGameState(newSquares, !xIsNext);
    
    setSaveMessage('Partie sauvegardée !');
    setTimeout(() => setSaveMessage(''), 1000);
  }

  function handleReset() {
    const emptyBoard = Array(9).fill(null);
    setSquares(emptyBoard);
    setXIsNext(true);
    
    saveGameState(emptyBoard, true);
    
    setSaveMessage('Nouvelle partie sauvegardée !');
    setTimeout(() => setSaveMessage(''), 1000);
  }
  
  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      
      <div className="board">
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      
      <div className="game-info">
        Prochain joueur : {xIsNext ? 'X' : 'O'}
      </div>
      
      <button className='reset-btn' onClick={handleReset}>
        Nouvelle partie
      </button>
      
      {saveMessage && <div className="save-message">{saveMessage}</div>}
    </div>
  );
} 