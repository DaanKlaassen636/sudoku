"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
  subgridIndex: number;
  index: number;
}

interface GuessesGridProps {
  guessesBitset: number;
}

const GuessesGrid = ({ guessesBitset }: GuessesGridProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-xs text-center">
      {Array.from({ length: 9 }).map((_, num) => {
        const digit = num + 1;
        const active = guessesBitset & (1 << digit);

        return (
          <div key={digit} className="flex items-center justify-center">
            {active ? digit : "\u2007"}
          </div>
        );
      })}
    </div>
  );
};

export function calcCellRealIndex(
  subgridIndex: number,
  cellIndex: number
): [number, number] {
  const startx = subgridIndex % 3;
  const starty = Math.floor(subgridIndex / 3);

  const cellx = cellIndex % 3;
  const celly = Math.floor(cellIndex / 3);

  return [startx * 3 + cellx, starty * 3 + celly];
}

const SudokuCell = forwardRef<SudokuCellHandle, Props>(
  ({ subgridIndex, index }, ref) => {
    const [isLocked, setLocked] = useState(false);
    const [isSelected, setSelected] = useState(false);
    const [guessesBitset, setGuesses] = useState<number>(0);
    const [answer, setAnswer] = useState<number | null>(null);
    const cellRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        setAnswer(value) {
          setAnswer(value);
        },
        getAnswer() {
          return answer;
        },
        setLocked(value) {
          setLocked(value);
        },
        isLocked() {
          return isLocked;
        },
        setSelected(value) {
          setSelected(value);
        },
        reset() {
          setAnswer(null);
          setLocked(false);
          setGuesses(0);
        },
      }),
      [answer, isLocked]
    );

    const handleInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isLocked) return;

      if (event.key === "Backspace" && answer !== null) {
        setAnswer(null);
        return;
      }

      const newDigit = Number(event.key);
      if (isNaN(newDigit) || newDigit === 0) return;

      if ((window as any).isGuessing) {
        setGuesses((prev) => prev ^ (1 << newDigit));
      } else {
        setAnswer(newDigit);
      }
    };

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: <This is a custom focusable element that handles keyboard input for game interactions. to move up down left right through cells you can use the arrow keys, and to input numbers you can use the number keys.>
    <div
        ref={cellRef}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <this is a custom focusable element that handles keyboard input for game interactions. tabIndex is necessary to make the div focusable so it can receive keyboard events.>
        tabIndex={0}
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        onKeyDown={handleInput}
        className={cn(
          "w-full h-full border flex items-center justify-center cursor-pointer transition-colors",
          "text-2xl select-none",
          isSelected
            ? "border-blue-500"
            : "border-gray-300",
          isLocked && "text-blue-500"
        )}
      >
        {answer === null ? (
          <GuessesGrid guessesBitset={guessesBitset} />
        ) : (
          answer
        )}
      </div>
    );
  }
);

SudokuCell.displayName = "SudokuCell";

export default SudokuCell;