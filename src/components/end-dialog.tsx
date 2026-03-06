import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function GameCompleteDialog({
  open,
  onNewGame,
}: {
  open: boolean;
  onNewGame: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="flex flex-col items-center justify-center rounded-2xl max-w-md">
        <DialogHeader className="flex flex-col items-center gap-6">
          <DialogTitle className="sr-only">Puzzle Complete</DialogTitle>

          <Image
            src="/sudoku-logo.png"
            alt="Sudoku Logo"
            width={300}
            height={200}
            priority
            className="pointer-events-none select-none"
          />

          <p className="text-2xl font-bold text-center">
            Puzzle Complete!
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-6 w-full items-center">
          <Button
            variant="outline"
            className="w-64 h-14 text-lg rounded-2xl shadow-md"
            onClick={onNewGame}
          >
            New Game
          </Button>

          <Button
            variant="outline"
            className="w-64 h-14 text-lg rounded-2xl shadow-md"
          >
            Main Menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}