import { cloneDeep } from 'lodash';
import { SquareType, Block, Empty } from "./GameComps/types";

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
        [Block.J, Block.J, Block.J],
        [Block.J, Empty.E, Empty.E],
    ],
    [Block.L]: [
        [Block.L, Block.L, Block.L],
        [Empty.E, Empty.E, Block.L],
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
  
    return cloneDeep(BlockShapes[randomBlock]); 
  } 