import React, { useEffect } from 'react';

const AIOpponent = ({ board, xIsNext, winner, makeAIMove }) => {
  useEffect(() => {
    if (!winner && !xIsNext) { 
// Check if there is no winner and it's the AI's turn
      const availableSpots = [];
      board.forEach((square, index) => {
        if (square === null) {
          availableSpots.push(index);
        }
      });
      if (availableSpots.length > 0) { 
// Make sure there are available spots to make a move
        const randomIndex = Math.floor(Math.random() * availableSpots.length);
        makeAIMove(availableSpots[randomIndex]);
      }
    }
  }, [board, xIsNext, winner, makeAIMove]);

  return null;
};

export default AIOpponent;
