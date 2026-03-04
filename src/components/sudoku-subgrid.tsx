"use client";

import { isCellValid } from "@/lib/sudoku";
import SudokuCell, { calcCellRealIndex } from "./sudoku-cell";

interface Props {
  board: number[][];
  index: number;
  lastMove: [number, number] | null;
  onCellChange: (row: number, col: number, value: number) => void;
  checked?: boolean;
  lockedCells: boolean[][];
}

const SudokuSubgrid = ({ index, board, checked, onCellChange, lockedCells }: Props) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border border-gray-500">
      {Array.from({ length: 9 }).map((_, cellIndex) => {
        const [x, y] = calcCellRealIndex(index, cellIndex);
        const value = board[y][x];

        return (
          <SudokuCell
            // biome-ignore lint/suspicious/noArrayIndexKey: <This is a static list of 9 cells per subgrid, so using the index as a key is acceptable and won't cause issues with reordering or dynamic changes.>
            key={cellIndex}
            value={value}
            row={y}
            col={x}
            onChange={(v) => onCellChange(y, x, v)}
            board={board}
            locked={lockedCells[y][x]} 
            isError={
              checked &&
              !lockedCells[y][x] &&
              board[y][x] !== 0 &&
              !isCellValid(board, y, x)
            }
            isCorrect={
              checked &&
              board[y][x] !== 0 &&
              isCellValid(board, y, x)
            }
          />
        );
      })}
    </div>
  );
};

export default SudokuSubgrid;
