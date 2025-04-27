import React, { useState, useEffect, useRef } from 'react';
import './GameBoard.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_SPEED = 400;

const GameBoard = ({ onGameOver, setScore: setAppScore }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [apple, setApple] = useState(generateRandomApple(INITIAL_SNAKE));
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameInterval = useRef(null);

  function generateRandomApple(currentSnake) {
    let newApple;
    do {
      newApple = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newApple.x && segment.y === newApple.y));
    return newApple;
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    clearInterval(gameInterval.current);
    gameInterval.current = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(gameInterval.current);
  }, [snake, direction, speed, moveSnake]); // Include moveSnake in the dependency array

  const moveSnake = () => {
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
      default:
        break;
    }

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || checkCollision(head)) {
      clearInterval(gameInterval.current);
      onGameOver(score);
      return;
    }

    const newSnake = [head, ...snake.slice(0, -1)];
    setSnake(newSnake);

    if (head.x === apple.x && head.y === apple.y) {
      setApple(generateRandomApple(newSnake));
      setScore((prevScore) => prevScore + 1);
      setAppScore((prevScore) => prevScore + 1);
      setSnake([...newSnake, { ...snake[snake.length - 1] }]);
      if ((score + 1) % 5 === 0 && speed > 100) {
        setSpeed((prevSpeed) => prevSpeed - 50);
      }
    }
  };

  const checkCollision = (head) => {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  };

  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      let cellClass = 'cell';
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        cellClass += ' snake-segment';
      }
      if (apple.x === x && apple.y === y) {
        cellClass += ' apple';
      }
      row.push(<div key={`${x}-${y}`} className={cellClass} />);
    }
    grid.push(<div key={y} className="row">{row}</div>);
  }

  return (
    <div className="game-board">
      <div className="grid">{grid}</div>
    </div>
  );
};

export default GameBoard;