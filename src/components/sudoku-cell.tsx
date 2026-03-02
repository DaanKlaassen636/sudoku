"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SudokuCellHandle {
  setAnswer(value: number | null): void;
  getAnswer(): number | null;
  setLocked(value: boolean): void;
  isLocked(): boolean;
  setSelected(value: boolean): void;
  reset(): void;
}

interface Props {
  value: number;
  row: number;
  col: number;
  onChange: (value: number) => void;
  isError?: boolean;
}

export function calcCellRealIndex(
  subgridIndex: number,
  cellIndex: number,
): [number, number] {
  const startx = subgridIndex % 3;
  const starty = Math.floor(subgridIndex / 3);

  const cellx = cellIndex % 3;
  const celly = Math.floor(cellIndex / 3);

  return [startx * 3 + cellx, starty * 3 + celly];
}

const SudokuCell = ({ value, onChange, isError }: Props) => {
  const [isSelected, setSelected] = useState(false);

  const handleInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const newDigit = Number(event.key);
    if (isNaN(newDigit) || newDigit === 0) return;

    onChange(newDigit);
  };

  return (
    <div
      tabIndex={0}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onKeyDown={handleInput}
      className={cn(
        "w-full h-full border flex items-center justify-center cursor-pointer",
        "text-2xl select-none",
        isSelected ? "border-blue-500" : isError ? "border-red-500 text-red-600" : "border-gray-300"
      )}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

SudokuCell.displayName = "SudokuCell";

export default SudokuCell;
