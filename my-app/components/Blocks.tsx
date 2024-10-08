import { SquareType, Block, Empty } from "./type";

export const BlockShape: { [key in Block]: SquareType[][] } = {
    [Block.S]: [
        [Empty.E, Block.S, Block.S],
        [Block.S, Block.S, Empty.E],
        [Empty.E, Empty.E, Empty.E],
    ],
    [Block.Z]: [
        [Block.Z, Block.Z, Empty.E],
        [Empty.E, Block.Z, Block.Z],
        [Empty.E, Empty.E, Empty.E],
    ],
    [Block.J]: [
        [Block.J, Empty.E, Empty.E],
        [Block.J, Block.J, Block.J],
        [Empty.E, Empty.E, Empty.E],
    ],
    [Block.L]: [
        [Empty.E, Empty.E, Block.L],
        [Block.L, Block.L, Block.L],
        [Empty.E, Empty.E, Empty.E],
    ],
    [Block.I]: [
        [Block.I, Block.I, Block.I, Block.I],
        [Empty.E, Empty.E, Empty.E, Empty.E],
    ],
    [Block.O]: [
        [Block.O, Block.O],
        [Block.O, Block.O],
    ],
    [Block.T]: [
        [Empty.E, Block.T, Empty.E],
        [Block.T, Block.T, Block.T],
        [Empty.E, Empty.E, Empty.E],
    ],
};





