import { SquareType, Empty } from "../types";

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