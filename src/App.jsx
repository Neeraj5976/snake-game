// ./src/App.jsx
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Instructions from './components/Instructions';
import './App.css';

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
        {gameOver ? <GameOver score={score} onRestart={handleRestart} /> : <GameBoard onGameOver={handleGameOver} setScore={setScore} />}
      </div>
      <div className="instructions">
        <Instructions />
      </div>
    </div>
  );
}

export default App;