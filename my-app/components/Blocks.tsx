import { SquareType, Block, Empty } from "./types";

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

export function getRandomBlock(): SquareType[][] {
    const blockValues = Object.values(Block);
    const randomIndex = Math.floor(Math.random() * blockValues.length);
    const randomBlock = blockValues[randomIndex];
  
    return BlockShapes[randomBlock]; 
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

    console.log(blockShape);
    console.log(rotatedShape);

    return rotatedShape;
}
