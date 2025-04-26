import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Instructions from './components/Instructions';

const GRID_SIZE = 20;
const INITIAL_SPEED = 400;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },  // Head
  { x: 9, y: 10 },   // Body
  { x: 8, y: 10 }    // Tail
];

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setGameOver(true);
  };

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="container">
      <div className="score">Score: {score}</div>
      <div className="game-area">
        {gameOver ? (
          <GameOver score={score} onRestart={handleRestart} />
        ) : (
          <GameBoard onGameOver={handleGameOver} />
        )}
      </div>
      <div className="instructions">
        <Instructions />
      </div>
    </div>
  );
}

export default App;