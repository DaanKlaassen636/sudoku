"use client";

import SudokuSubgrid from "./sudoku-subgrid";

const SudokuGrid = () => {
  return (
    <div className="w-125 h-125 m-4 grid grid-cols-3 border-2 border-gray-700">
      {Array.from({ length: 9 }).map((subgrid, subgridIndex) => (
        <SudokuSubgrid key={`${subgridIndex}-${subgrid}`} index={subgridIndex} />
      ))}
    </div>
  );
};

export default SudokuGrid;