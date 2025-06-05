import { SquareType, Empty } from "../GameComps/types";

export function canClearRow(row: SquareType[]):(boolean)
{
   return row.every(cell => cell !== Empty.E);
}

export function updateScore(numberOfRowsCleared: number, score: number): number {
  switch (numberOfRowsCleared) {
    case 1:
      score += 20;
      break;
    case 2:
      score += 50;
      break;
    case 3:
      score += 100; 
      break;
    case 4:
      score += 200; 
      break;
    default:
      break;
  }
  return score; 
}
export function canMove(
  board: SquareType[][],
  blockShape: SquareType[][],
  position: { row: number; column: number }
): boolean {
  const { row, column } = position;

  if (
    row < 0 ||
    row + blockShape.length > board.length ||
    column < 0 ||
    column + blockShape[0].length > board[0].length
  ) {
    return false;
  }

  for (let r = 0; r < blockShape.length; r++) {
    for (let c = 0; c < blockShape[0].length; c++) {
      if (blockShape[r][c] !== Empty.E) {
        if (board[row + r][c + column] !== Empty.E) {
          return false;
        }
      }
    }
  }

  return true;
}

export function clearRows(board: SquareType[][], score: number): { board: SquareType[][], score: number } {
  const clearedBoard = board.filter(row => !canClearRow(row));
  const numberOfRowsCleared = board.length - clearedBoard.length; 

  score = updateScore(numberOfRowsCleared, score);

  const emptyRows = Array.from({ length: numberOfRowsCleared }, () => Array(board[0].length).fill(Empty.E));
  
  return { board: [...emptyRows, ...clearedBoard], score }; 
}

