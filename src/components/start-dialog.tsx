import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DialogClose } from "./animate-ui/primitives/radix/dialog";
import GamerulesDialog from "@/components/gamerules-dialog";
import React from "react";

export default function StartDialog({
  onStartGame,
}: {
  onStartGame: () => void;
}) {
  //game rules dialog state
  const [showGamerules, setShowGamerules] = React.useState(false);

  const handleGamerules = () => {
    setShowGamerules(!showGamerules);
  };

  return (
    <>
      {showGamerules && (
        <GamerulesDialog
          showGamerules={showGamerules}
          handleGamerules={handleGamerules}
        />
      )}

      <Dialog open={true}>
        <DialogContent className="flex flex-col items-center justify-center rounded-2xl max-w-md">
          <DialogHeader className="flex flex-col items-center gap-6">
            <DialogTitle className="sr-only">Sudoku</DialogTitle>

            <Image
              src="/sudoku-logo.png"
              alt="Sudoku Logo"
              width={300}
              height={200}
              priority
              className="pointer-events-none select-none"
            />
          </DialogHeader>

          <div className="flex flex-col gap-5 mt-6 w-full items-center">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-64 h-14 text-lg rounded-2xl shadow-md"
                onClick={onStartGame}
              >
                New game
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              className="w-64 h-14 text-lg rounded-2xl shadow-md"
              onClick={handleGamerules}
            >
              Gamerules
            </Button>
            <Button
              variant="outline"
              className="w-64 h-14 text-lg rounded-2xl shadow-md"
            >
              Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
