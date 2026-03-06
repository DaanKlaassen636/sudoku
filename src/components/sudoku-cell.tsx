"use client";

import { useState } from "react";
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
  board: number[][];
  value: number;
  row: number;
  col: number;
  onChange: (value: number) => void;
  isError?: boolean;
  isCorrect?: boolean;
  locked?: boolean;
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

const SudokuCell = ({ value, onChange, isError, isCorrect, locked }: Props) => {
  const [isSelected, setSelected] = useState(false);

  const handleInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (locked) return; // prevent editing locked cells

    if (event.key === "Backspace" || event.key === "Delete") {
      onChange(0); // clear the cell
      return;
    }
    const newDigit = Number(event.key);
    // biome-ignore lint/suspicious/noGlobalIsNan: <Using isNaN is appropriate here to validate user input and ensure it's a number.>
    if (isNaN(newDigit) || newDigit === 0) return;

    onChange(newDigit);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <This div is meant to be interactive, but we handle accessibility with keyboard events and focus management.>
    <div
      // biome-ignore lint/a11y/noNoninteractiveTabindex: <tabIndex is necessary to make this div focusable for keyboard users, enabling them to interact with the cell using the keyboard.>
      tabIndex={0}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onKeyDown={handleInput}
      className={cn(
        "w-full h-full border flex items-center justify-center cursor-pointer",
        "text-3xl select-none font-bold",
        locked
          ? "bg-gray-100 font-bold cursor-default"
          : isError
            ? "border-red-500 text-red-600"
            : isCorrect
              ? "border-green-500 text-green-600"
              : isSelected
                ? "border-blue-500"
                : "border-gray-300",
      )}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};
SudokuCell.displayName = "SudokuCell";

export default SudokuCell;
