import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";

import { DialogClose } from "./animate-ui/primitives/radix/dialog";
import { Button } from "@/components/ui/button";

export default function GamerulesDialog({
  showGamerules,
  handleGamerules,
}: {
  showGamerules: boolean;
  handleGamerules: () => void;
}) {
  return (
    <Dialog open={showGamerules}>
      <DialogContent className="flex flex-col rounded-2xl max-w-md max-h-[80vh] overflow-y-auto p-8">

        {/* Close button */}
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={handleGamerules}
          >
            ✕
          </Button>
        </DialogClose>

        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-bold text-center">
            How to Play
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8 text-left">

          <section>
            <h2 className="text-xl font-semibold mb-2">Objective</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Fill the 9×9 grid so that every row, column, and 3×3 subgrid
              contains all digits from 1 to 9 without repeating.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">How to Play</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Click on an empty cell to select it. Type a number (1–9) to fill
              the cell. If the number violates Sudoku rules (duplicate in row,
              column, or subgrid), the cell will be highlighted as an error and
              your error counter will increase.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mt-2">
              Use Backspace to remove a number if you make a mistake. Continue
              filling the grid until all cells are correctly completed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Winning</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Complete the entire grid without breaking the rules. Every number
              must fit the Sudoku rules in its row, column, and subgrid. Once
              all cells are correctly filled, you win the game.
            </p>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  );
}