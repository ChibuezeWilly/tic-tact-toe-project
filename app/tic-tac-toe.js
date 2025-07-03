"use client";
import { useState } from "react";

// Placeholder for shadcn/ui components (replace with real imports if available)
const Card = ({ className = "", children }) => (
  <div className={`rounded-xl shadow bg-white p-6 ${className}`}>{children}</div>
);
const Button = ({ className = "", ...props }) => (
  <button className={`rounded-md px-6 py-2 font-semibold text-base shadow-sm transition bg-gray-200 hover:bg-gray-300 ${className}`} {...props} />
);

const emptyBoard = () => Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [status, setStatus] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner(bd) {
    for (let line of lines) {
      const [a, b, c] = line;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  }

  function handleClick(idx) {
    if (board[idx] || gameOver) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    const winner = calculateWinner(newBoard);
    let newStatus = "";
    let newScores = { ...scores };
    let over = false;
    if (winner) {
      newStatus = `Player ${winner} wins!`;
      newScores[winner] += 1;
      over = true;
    } else if (newBoard.every(Boolean)) {
      newStatus = "It's a draw!";
      newScores.draws += 1;
      over = true;
    } else {
      newStatus = `Player ${xIsNext ? "O" : "X"}'s turn`;
    }
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setStatus(newStatus);
    setScores(newScores);
    setGameOver(over);
  }

  function handleNewGame() {
    setBoard(emptyBoard());
    setXIsNext(true);
    setStatus("Player X's turn");
    setGameOver(false);
  }

  function handleResetAll() {
    setBoard(emptyBoard());
    setXIsNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
    setStatus("Player X's turn");
    setGameOver(false);
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
      {/* Board */}
      <Card className="p-6 flex flex-col items-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className={`w-20 h-20 text-4xl font-bold flex items-center justify-center border-2 rounded-lg transition select-none
                ${cell === "X" ? "text-blue-600" : cell === "O" ? "text-red-500" : "text-gray-400"}
                ${!cell && !gameOver ? "hover:bg-gray-100 active:bg-gray-200" : "bg-gray-50"}
              `}
              onClick={() => handleClick(idx)}
              disabled={!!cell || gameOver}
              aria-label={`Cell ${idx + 1}`}
            >
              {cell}
            </button>
          ))}
        </div>
      </Card>
      {/* Right Panel */}
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Card className="text-center font-semibold text-xl text-blue-700 py-4">
          {status}
        </Card>
        <Card>
          <div className="text-center font-bold text-lg mb-2">Score Board</div>
          <div className="flex justify-around items-center text-base font-semibold">
            <div className="flex flex-col items-center">
              <span className="text-blue-600 border border-blue-400 rounded px-2 mb-1">Player X</span>
              <span className="text-blue-600 text-2xl">{scores.X}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-600 border border-yellow-400 rounded px-2 mb-1">Draws</span>
              <span className="text-yellow-600 text-2xl">{scores.draws}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-500 border border-red-400 rounded px-2 mb-1">Player O</span>
              <span className="text-red-500 text-2xl">{scores.O}</span>
            </div>
          </div>
        </Card>
        <div className="flex gap-2">
          <Button className="flex-1 bg-gray-400 text-white hover:bg-gray-500" onClick={handleNewGame}>New Game</Button>
          <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleResetAll}>Reset All</Button>
        </div>
      </div>
    </div>
  );
} 