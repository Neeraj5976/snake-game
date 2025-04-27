import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>How to Play</h2>
      <p>Control the snake to eat the red apples and grow longer. Avoid colliding with the walls or the snake's own body. Each apple eaten increases your score, and the game speed will increase periodically.</p>
      <h3>Controls:</h3>
      <div className="controls">
        <div className="key-row">
          <span>Up:</span>
          <span className="key">↑</span> or <span className="key">W</span>
        </div>
        <div className="key-row">
          <span>Down:</span>
          <span className="key">↓</span> or <span className="key">S</span>
        </div>
        <div className="key-row">
          <span>Left:</span>
          <span className="key">←</span> or <span className="key">A</span>
        </div>
        <div className="key-row">
          <span>Right:</span>
          <span className="key">→</span> or <span className="key">D</span>
        </div>
      </div>
    </div>
  );
};

export default Instructions;