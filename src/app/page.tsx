"use client";

import { useEffect, useState, useCallback } from "react";
import SudokuGrid from "@/components/sudoku-grid";
import { generateBoard, isCellValid, removeCellsFromBoard } from "@/lib/sudoku";
import { Button } from "@/components/ui/button";
import StartDialog from "@/components/start-dialog";

export default function Page() {
  const [board, setBoard] = useState<number[][]>([]);
  const [lockedCells, setLockedCells] = useState<boolean[][]>([]);
  const [lastMove, setLastMove] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState(0);
  const [checked, setChecked] = useState(false);

  // game settings
  const [boardcellsVisible] = useState(40); // remove 40 cells for puzzle
  
  const startGame = useCallback(() => {
    const newBoard = generateBoard();
    removeCellsFromBoard(newBoard, boardcellsVisible);
    setBoard(newBoard);

    const newLocked = newBoard.map((row) => row.map((cell) => cell !== 0));
    setLockedCells(newLocked);

    setErrors(0);
    setChecked(false);
    setLastMove(null);
  }, [boardcellsVisible]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleCellChange = (row: number, col: number, value: number) => {
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);

    setLastMove([row, col]); // track the last edited cell
    setChecked(false); // reset previous check
  };

  // Button handler to check the whole board
  const handleCheckBoard = () => {
    let errorCount = 0;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          !lockedCells[row][col] &&
          board[row][col] !== 0 &&
          !isCellValid(board, row, col)
        ) {
          errorCount++;
        }
      }
    }
    setErrors(errorCount);
    setChecked(true);
  };

  if (!board.length) return <div>Loading Sudoku...</div>;

  return (
    <>
      <StartDialog onStartGame={startGame} />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Sudoku</h1>
        <div className="text-red-600 mb-2">Errors: {errors}</div>

        <SudokuGrid
          board={board}
          lockedCells={lockedCells}
          lastMove={lastMove}
          checked={checked}
          onCellChange={handleCellChange}
        />

        <Button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleCheckBoard}
        >
          Check Board
        </Button>
      </div>
    </>
  );
}
