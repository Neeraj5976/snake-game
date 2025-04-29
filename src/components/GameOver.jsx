// ./src/components/GameOver.jsx
import React from 'react';
import './GameOver.css';

function GameOver({ score, onRestart }) {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p className="final-score">Final Score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default GameOver;