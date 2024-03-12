import React from 'react';

const GameStats = ({ playerOneColor, playerTwoColor, playerOneScore, playerTwoScore}) => {
  return (
    <div className="game-stats">
      <div className="player-stats" style={{ color: playerOneColor }}>
        Player One Score: {playerOneScore}
      </div>
      <div className="player-stats" style={{ color: playerTwoColor }}>
        Player Two Score: {playerTwoScore}
      </div>
      {/* <div className="total-moves">Total Moves to Win: {totalMovesToWin}</div> */}
    </div>
  );
};

export default GameStats;
