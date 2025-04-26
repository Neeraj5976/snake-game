import React from 'react';
import './GameOver.css';

function GameOver({ score, onRestart }) {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
      <button onClick={onRestart} className="restart-button">
        Play Again
      </button>
    </div>
  );
}

export default GameOver;