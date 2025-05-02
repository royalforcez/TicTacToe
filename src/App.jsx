import { useState, useEffect } from 'react'
import './App.css'
import { saveGameState, loadGameState, loadPlayers } from './services/dbService';

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [player1, setplayer1] = useState('');
  const [player2, setplayer2] = useState('');

  useEffect(() => {
    const savedGame = loadGameState();
    if (savedGame) {
      setSquares(savedGame.squares);
      setXIsNext(savedGame.xIsNext);
    }
    const savedPlayers = loadPlayers();
    /*if (savedPlayers.player1) {
      setplayer1(savedPlayers.player1);
    }
    if (savedPlayers.player2) {
      setplayer2(savedPlayers.player2);
    }*/
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

  function createPlayer(playerNumber) {
    const namePlayer = prompt(`Nom du joueur ${playerNumber}`);
    if (namePlayer) {
      if (playerNumber === 1) {
        setplayer1(namePlayer);
        localStorage.setItem('tictactoe_player1', namePlayer);
      }
      else {
        setplayer2(namePlayer);
        localStorage.setItem('tictactoe_player2', namePlayer);
      }
      alert(`Bienvenue ${namePlayer}`);
    }
    else {
      alert("Veuillez entrer un nom valide")
    }
  }
  return (
    <div className="game-container">

      <button className='authent-btn' onClick={() => createPlayer(1)}>
        {player1}
      </button>

      <button className='authent-btn' onClick={() => createPlayer(2)}>
        {player2}
      </button>

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