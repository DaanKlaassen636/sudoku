import { calcCellRealIndex } from "@/components/sudoku-cell";

function isRowValid(board: number[][], rowIndex: number): boolean {
  let numbersBitset = 0;

  for (let col = 0; col < 9; col++) {
    const value = board[rowIndex][col];
    if (value === 0) continue;

    if (numbersBitset & (1 << value)) return false;
    numbersBitset |= 1 << value;
  }

  return true;
}

function isColumnValid(board: number[][], columnIndex: number): boolean {
  let numbersBitset = 0;

  for (let row = 0; row < 9; row++) {
    const value = board[row][columnIndex];
    if (value === 0) continue;

    if (numbersBitset & (1 << value)) return false;
    numbersBitset |= 1 << value;
  }

  return true;
}

function getSubgridValidCells(
  board: number[][],
  subgridIndex: number,
  digit: number,
): [number, number][] {
  const validCells: [number, number][] = [];

  for (let i = 0; i < 9; i++) {
    const [x, y] = calcCellRealIndex(subgridIndex, i);
    const originalValue = board[y][x];

    if (originalValue !== 0) continue;

    board[y][x] = digit;

    if (isRowValid(board, y) && isColumnValid(board, x)) {
      validCells.push([x, y]);
    }

    board[y][x] = 0; // reset
  }

  return validCells;
}

function randrange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateBoard(): number[][] {
  function generateBoardAttempt(): number[][] | null {
    const board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => 0),
    );

    for (let digit = 1; digit <= 9; digit++) {
      for (let subgrid = 0; subgrid < 9; subgrid++) {
        const validCells = getSubgridValidCells(board, subgrid, digit);

        if (validCells.length === 0) return null;

        const randomIndex = randrange(0, validCells.length);
        const [x, y] = validCells[randomIndex];

        board[y][x] = digit;
      }
    }

    return board;
  }

  let board: number[][] | null = null;

  while (board === null) {
    board = generateBoardAttempt();
  }

  return board;
}

export function removeCellsFromBoard(
  board: number[][],
  numberOfCells: number,
): void {
  const availableCells = Array.from({ length: 81 }, (_, i) => i);

  for (let i = 0; i < numberOfCells; i++) {
    if (availableCells.length === 0) break;

    const listIndex = randrange(0, availableCells.length);
    const flatIndex = availableCells[listIndex];

    const x = flatIndex % 9;
    const y = Math.floor(flatIndex / 9);

    board[y][x] = 0;
    availableCells.splice(listIndex, 1);
  }
}

function isSubgridValid(board: number[][], row: number, col: number): boolean {
  let numbersBitset = 0;

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const value = board[startRow + r][startCol + c];
      if (value === 0) continue;

      if (numbersBitset & (1 << value)) return false;
      numbersBitset |= 1 << value;
    }
  }

  return true;
}

export function isMoveValid(
  board: number[][],
  row: number,
  col: number,
  value: number,
): boolean {
  const original = board[row][col];
  board[row][col] = value;

  const valid =
    isRowValid(board, row) &&
    isColumnValid(board, col) &&
    isSubgridValid(board, row, col);

  board[row][col] = original;

  return valid;
}

export function isMovegloballyValid(
  board: number[][],
  row: number,
  col: number,
  value: number,
): boolean {
  const original = board[row][col];
  board[row][col] = value;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cellValue = board[r][c];
      if (cellValue === 0) continue;

      if (
        !isRowValid(board, r) ||
        !isColumnValid(board, c) ||
        !isSubgridValid(board, r, c)
      ) {
        board[row][col] = original;
        return false;
      }
    }
  }

  board[row][col] = original;
  return true;
}
