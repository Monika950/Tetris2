import { cloneDeep } from 'lodash';
import { SquareType, Block, Empty } from "./types";
import { writeFile } from '../api/file';

export const BlockShapes: { [key in Block]: SquareType[][] } = {
    [Block.S]: [
        [Empty.E, Block.S, Block.S],
        [Block.S, Block.S, Empty.E],
    ],
    [Block.Z]: [
        [Block.Z, Block.Z, Empty.E],
        [Empty.E, Block.Z, Block.Z],
    ],
    [Block.J]: [
        [Block.J, Empty.E, Empty.E],
        [Block.J, Block.J, Block.J],
    ],
    [Block.L]: [
        [Empty.E, Empty.E, Block.L],
        [Block.L, Block.L, Block.L],
    ],
    [Block.I]: [
        [Block.I, Block.I, Block.I, Block.I],
    ],
    [Block.O]: [
        [Block.O, Block.O],
        [Block.O, Block.O],
    ],
    [Block.T]: [
        [Empty.E, Block.T, Empty.E],
        [Block.T, Block.T, Block.T],
    ],
};

export function getRandomBlock(): [Block,SquareType[][]] {
    const blockValues = Object.values(Block);
    const randomIndex = Math.floor(Math.random() * blockValues.length);
    const randomBlock = blockValues[randomIndex];

    writeFile(`${randomBlock}`);
  
    return [randomBlock,cloneDeep(BlockShapes[randomBlock])]; 
  } 

export function rotateBlock(blockShape: SquareType[][]): SquareType[][] {
    const shapeHeight = blockShape.length;
    const shapeWidth = blockShape[0].length;

    const rotatedShape: SquareType[][] = Array.from({ length: shapeWidth }, () =>
        Array(shapeHeight).fill(Empty.E)
    );

    for (let r = 0; r < shapeHeight; r++) {
        for (let c = 0; c < shapeWidth; c++) {
            rotatedShape[c][shapeHeight - 1 - r] = blockShape[r][c];
        }
    }

    return rotatedShape;
}

export function canClearRow(row: SquareType[]):(boolean)
{
   return row.every(cell => cell !== Empty.E);
}

export function clearRows(board: SquareType[][], score: number): { board: SquareType[][], score: number } {
  const clearedBoard = board.filter(row => !canClearRow(row));
  const numberOfRowsCleared = board.length - clearedBoard.length; 
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
  const emptyRows = Array.from({ length: numberOfRowsCleared }, () => Array(board[0].length).fill(Empty.E));
  
  return { board: [...emptyRows, ...clearedBoard], score }; 
}