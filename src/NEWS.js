import React, { useState } from "react";

import Board from './Components/Board';
import ResetButton from './Components/ResetButton';
import ScoreBoard from './Components/ScoreBoard';

import './App.css';

const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    if (board[boxIdx] || gameOver) return; // Ignore clicks on already-filled or game-over boxes

    // Update the board
    const updatedBoard = board.map((value, idx) => {
      return idx === boxIdx ? (xPlaying ? "X" : "O") : value;
    });

    setBoard(updatedBoard);

    // Check for a winner
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        setScores({ ...scores, oScore: scores.oScore + 1 });
      } else {
        setScores({ ...scores, xScore: scores.xScore + 1 });
      }
      setGameOver(true);
    } else {
      // Switch turns if no winner
      setXPlaying(!xPlaying);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x]; // Return the winner ("X" or "O")
      }
    }
    return null; // No winner yet
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setXPlaying(true); // Reset to player "X" by default
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
};

export default App;
