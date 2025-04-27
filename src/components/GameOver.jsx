import React from 'react';
import './GameOver.css';

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p className="final-score">Final Score: {score}</p>
      <button onClick={onRestart} className="restart-button">Play Again</button>
    </div>
  );
};

export default GameOver;