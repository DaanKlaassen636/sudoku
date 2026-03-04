"use client";

import SudokuSubgrid from "./sudoku-subgrid";

interface SudokuGridProps {
  board: number[][];
  lastMove: [number, number] | null;
  checked: boolean;
  onCellChange: (row: number, col: number, value: number) => void;
  lockedCells: boolean[][];
}

const SudokuGrid = ({
  board,
  lastMove,
  checked,
  onCellChange,
  lockedCells,
}: SudokuGridProps) => {
  return (
    <div className="w-125 h-125 m-4 grid grid-cols-3 border-2 border-gray-700">
      {Array.from({ length: 9 }).map((_subgrid, subgridIndex) => (
        <SudokuSubgrid
          // biome-ignore lint/suspicious/noArrayIndexKey: <This is a static list of 9 cells per subgrid, so using the index as a key is acceptable and won't cause issues with reordering or dynamic changes.>
          key={subgridIndex}
          index={subgridIndex}
          board={board}
          lastMove={lastMove}
          checked={checked}
          onCellChange={onCellChange}
          lockedCells={lockedCells}
        />
      ))}
    </div>
  );
};

export default SudokuGrid;
