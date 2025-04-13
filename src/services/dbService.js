export const saveGameState = (squares, xIsNext) => {
  try {
    localStorage.setItem('ticTacToe_squares', JSON.stringify(squares));
    localStorage.setItem('ticTacToe_xIsNext', xIsNext);
    
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

export const initDatabase = async () => {
  return true;
}; 