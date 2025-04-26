import React from 'react';
import './Instructions.css';

function Instructions() {
  return (
    <div className="instructions-container">
      <h3>How to Play</h3>
      <p>Guide the snake to eat the apples and grow longer. Avoid hitting the walls or yourself!</p>
      <div className="controls">
        <h4>Controls:</h4>
        <div className="control-keys">
          <div className="key-row">
            <kbd>↑</kbd> or <kbd>W</kbd> - Move Up
          </div>
          <div className="key-row">
            <kbd>↓</kbd> or <kbd>S</kbd> - Move Down
          </div>
          <div className="key-row">
            <kbd>←</kbd> or <kbd>A</kbd> - Move Left
          </div>
          <div className="key-row">
            <kbd>→</kbd> or <kbd>D</kbd> - Move Right
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;