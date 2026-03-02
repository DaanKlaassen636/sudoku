"use client";

import { useEffect, useState } from "react";
import SudokuGrid from "@/components/sudoku-grid";
import { generateBoard, isMovegloballyValid, removeCellsFromBoard } from "@/lib/sudoku";
import { isMoveValid } from "@/lib/sudoku";

export default function Page() {
  const [board, setBoard] = useState<number[][] | null>(null);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const newBoard = generateBoard();
    removeCellsFromBoard(newBoard, 40); // remove 40 cells for puzzle
    setBoard(newBoard);
  }, []);

const handleCellChange = (row: number, col: number, value: number) => {
  if (!board) return;

  if (!isMovegloballyValid(board, row, col, value)) {
    // Wrong move, increment error counter
    setErrors((prev) => prev + 1);
    return; // Do NOT update the board
  }

  // Valid move, update board
  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = value;
  setBoard(newBoard);
};

  if (!board) return <div>Loading Sudoku...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sudoku</h1>
      <div className="text-red-600 mb-2">Errors: {errors}</div>
      {/* TODO: pass board into SudokuGrid and cells */}
      <SudokuGrid board={board} onCellChange={handleCellChange} />
    </div>
  );
}
