"use client";

import { useEffect, useState } from "react";
import SudokuGrid from "@/components/sudoku-grid";
import { generateBoard, removeCellsFromBoard } from "@/lib/sudoku";

export default function Page() {
  // The board state: 9x9 numbers (0 = empty)
  const [board, setBoard] = useState<number[][] | null>(null);

  useEffect(() => {
    // 1. Generate a full board
    const newBoard = generateBoard();

    // 2. Remove cells to create a puzzle (e.g., 40 cells removed)
    removeCellsFromBoard(newBoard, 40);

    // 3. Set the board state
    setBoard(newBoard);

    // Optionally, initialize a global board for your Cells
    (window as any).boardValues = newBoard;
  }, []);

  if (!board) {
    return <div>Loading Sudoku...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sudoku</h1>
      <SudokuGrid />
      {/* You could add buttons like "New Game" or "Check Solution" here */}
    </div>
  );
}