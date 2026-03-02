"use client";

import { isMovegloballyValid } from "@/lib/sudoku";
import SudokuCell, { calcCellRealIndex } from "./sudoku-cell";

interface Props {
  index: number;
  board: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

const SudokuSubgrid = ({ index, board, onCellChange }: Props) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border border-gray-500">
      {Array.from({ length: 9 }).map((_, cellIndex) => {
        const [x, y] = calcCellRealIndex(index, cellIndex);
        const value = board[y][x];

        return (
        <SudokuCell
          key={cellIndex}
          value={value}
          row={y}
          col={x}
          isError={!isMovegloballyValid(board, y, x, value) && value !== 0}
          onChange={(v) => onCellChange(y, x, v)} 
        />
        );
      })}
    </div>
  );
};

export default SudokuSubgrid;
