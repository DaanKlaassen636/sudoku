"use client";

import { useRef } from "react";
import SudokuCell, { calcCellRealIndex, SudokuCellHandle } from "./sudoku-cell";

interface Props {
  index: number;
}

const SudokuSubgrid = ({ index }: Props) => {
  const cellRefs = useRef<Array<SudokuCellHandle | null>>(
    Array.from({ length: 9 }, () => null)
  );

  return (
    <div className="grid grid-cols-3 grid-rows-3 border border-gray-500">
      {Array.from({ length: 9 }).map((cell, cellIndex) => {
        const [x, y] = calcCellRealIndex(index, cellIndex);

        return (
          <SudokuCell
            key={`${cellIndex}-${cell}`}
            ref={(el) => {
              cellRefs.current[cellIndex] = el;

              if (!(window as any).board) (window as any).board = [];
              if (!(window as any).board[y]) (window as any).board[y] = [];
              (window as any).board[y][x] = el;
            }}
            index={cellIndex}
            subgridIndex={index}
          />
        );
      })}
    </div>
  );
};

export default SudokuSubgrid;