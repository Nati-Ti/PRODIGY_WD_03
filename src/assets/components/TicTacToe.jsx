import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import GameModeSelection from './GameModeSelection';
import AIOpponent from './AIOpponent';
import GameStats from './GameStats';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showGameModeSelection, setShowGameModeSelection] = useState(true);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [playerOneColor, setPlayerOneColor] = useState('#ff0000'); // Player One color
  const [playerTwoColor, setPlayerTwoColor] = useState('#0000ff'); // Player Two color
  const [playerOneScore, setPlayerOneScore] = useState(0); // Player One score
  const [playerTwoScore, setPlayerTwoScore] = useState(0); // Player Two score

  useEffect(() => {
    if (showResetMessage) {
      const timeout = setTimeout(() => {
        resetGame();
        setShowResetMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showResetMessage]);

  useEffect(() => {
    if (selectedGameMode) {
      setGameStarted(true);
      setShowGameModeSelection(false);
    }
  }, [selectedGameMode]);

  const handleClick = (index) => {
    if (winner || board[index]) return;
  
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  
    const calculatedWinner = calculateWinner(newBoard);
    if (calculatedWinner) {
      updateScores(calculatedWinner);
      setWinner(calculatedWinner);// Update scores when a winner is found
      setShowResetMessage(true); // Show reset message after winning
      if (checkWinningCondition(calculatedWinner)) {
        congratulateWinner(calculatedWinner);
        resetGameScores();
      }
    } else if (!newBoard.includes(null)) {
      // If all spots are filled and no winner, reset the game
      setShowResetMessage(true); // Show reset message after draw
    }
  };
  
  const checkWinningCondition = (winner) => {
    return winner === 'X' ? playerOneScore === 2 : playerTwoScore === 2;
  };
  

  const updateScores = (winner) => {
    if (winner === 'X') {
      setPlayerOneScore(playerOneScore + 1);
    } else if (winner === 'O') {
      setPlayerTwoScore(playerTwoScore + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const resetGameScores = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  };

  const congratulateWinner = (winner) => {
    alert(`Congratulations! 🎉🎉🎉 Player ${winner}! You have won three times.`);
    resetGame();
    setSelectedGameMode(null);
    setShowGameModeSelection(true);
    setGameStarted(false);
  };

  const handleGameModeSelection = (mode) => {
    setSelectedGameMode(mode);
    resetGame();
    resetGameScores();
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const status = winner ? `Winner: ${winner}` : `Next move: ${xIsNext ? 'Player - X' : 'Player - O'}`;

  return (
    <div className="game">
      
      {showGameModeSelection && <GameModeSelection onSelectMode={handleGameModeSelection} />}
      {gameStarted && (
        
        <div className="game-container">
          <h1>Tic-Tac-Toe</h1>
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-info">{status}</div>
          <GameStats
            playerOneColor={playerOneColor}
            playerTwoColor={playerTwoColor}
            playerOneScore={playerOneScore}
            playerTwoScore={playerTwoScore}
          />
          {showResetMessage && <div className="reset-message">The game will restart in 3 seconds.</div>}
          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
          {selectedGameMode === 'againstAI' && (
            <AIOpponent board={board} xIsNext={xIsNext} winner={winner} makeAIMove={handleClick} />
          )}
        </div>
      )}
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the marker of the winner (X or O)
    }
  }
  return null;
};

export default TicTacToe;
