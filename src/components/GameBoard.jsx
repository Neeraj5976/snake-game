import React, { useState, useEffect, useCallback } from 'react';
import './GameBoard.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_SPEED = 400;

function GameBoard({ onGameOver }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [apple, setApple] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateApple = useCallback(() => {
    const newApple = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    if (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y)) {
      return generateApple();
    }
    return newApple;
  }, [snake]);

  const moveSnake = useCallback(() => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check for collisions
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      onGameOver(score);
      return;
    }

    const newSnake = [head];
    if (head.x === apple.x && head.y === apple.y) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore % 5 === 0) {
          setSpeed(prevSpeed => Math.max(prevSpeed - 50, 100));
        }
        return newScore;
      });
      newSnake.push(...snake);
      setApple(generateApple());
    } else {
      newSnake.push(...snake.slice(0, -1));
    }

    setSnake(newSnake);
  }, [snake, direction, apple, score, onGameOver, generateApple]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      if (key === 'W' || key === 'ARROWUP') {
        if (direction !== 'DOWN') setDirection('UP');
      } else if (key === 'S' || key === 'ARROWDOWN') {
        if (direction !== 'UP') setDirection('DOWN');
      } else if (key === 'A' || key === 'ARROWLEFT') {
        if (direction !== 'RIGHT') setDirection('LEFT');
      } else if (key === 'D' || key === 'ARROWRIGHT') {
        if (direction !== 'LEFT') setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speed]);

  return (
    <div className="game-board">
      <div className="grid">
        {Array(GRID_SIZE).fill().map((_, y) => (
          <div key={y} className="grid-row">
            {Array(GRID_SIZE).fill().map((_, x) => (
              <div
                key={`${x}-${y}`}
                className={`grid-cell ${
                  snake.some(segment => segment.x === x && segment.y === y) ? 'snake' : ''
                } ${apple.x === x && apple.y === y ? 'apple' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;