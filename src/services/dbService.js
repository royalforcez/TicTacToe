export const saveGameState = (squares, xIsNext, player1, player2) => {
  try {
    localStorage.setItem('ticTacToe_squares', JSON.stringify(squares));
    localStorage.setItem('ticTacToe_xIsNext', xIsNext);
    localStorage.setItem('tictactoe_player1', player1);
    localStorage.setItem('tictactoe_player2', player2);

    return true;
  } catch (error) {
    console.error('Erreur de sauvegarde:', error);
    return false;
  }
};

export const loadGameState = () => {
  try {
    const squares = JSON.parse(localStorage.getItem('ticTacToe_squares'));
    const xIsNext = localStorage.getItem('ticTacToe_xIsNext') === 'true';

    if (!squares) {
      return null;
    }

    return { squares, xIsNext };
  } catch (error) {
    console.error('Erreur de chargement:', error);
    return null;
  }
};

export const loadPlayers = () => {
  const player1 = localStorage.getItem('tictacToe_player1');
  const player2 = localStorage.getItem('tictacToe_player2');
  console.log('player1', player1);
  console.log('player2', player2);

  return (player1, player2)
}

export const initDatabase = async () => {
  return true;
}; 