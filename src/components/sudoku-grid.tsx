"use client";

import SudokuSubgrid from "./sudoku-subgrid";
interface SudokuGridProps {
  board: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

const SudokuGrid = ({ board, onCellChange }: SudokuGridProps) => {
  return (
    <div className="w-125 h-125 m-4 grid grid-cols-3 border-2 border-gray-700">
      {Array.from({ length: 9 }).map((subgrid, subgridIndex) => (
        <SudokuSubgrid
          key={subgridIndex}
          index={subgridIndex}
          board={board}
          onCellChange={onCellChange}
        />
      ))}
    </div>
  );
};

export default SudokuGrid;
