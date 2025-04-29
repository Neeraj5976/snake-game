// ./src/components/Instructions.jsx
import React from 'react';
import './Instructions.css';

function Instructions() {
  return (
    <div className="instructions-container">
      <h2>How to Play</h2>
      <p>Control the snake to eat the red apples. Each apple eaten will make the snake grow longer and increase your score. Be careful not to run into the walls or collide with your own tail!</p>
      <div className="controls">
        <h3>Controls:</h3>
        <div className="key-row">
          <span>Up:</span>
          <div className="key">↑</div>
          <span>or</span>
          <div className="key">W</div>
        </div>
        <div className="key-row">
          <span>Down:</span>
          <div className="key">↓</div>
          <span>or</span>
          <div className="key">S</div>
        </div>
        <div className="key-row">
          <span>Left:</span>
          <div className="key">←</div>
          <span>or</span>
          <div className="key">A</div>
        </div>
        <div className="key-row">
          <span>Right:</span>
          <div className="key">→</div>
          <span>or</span>
          <div className="key">D</div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;