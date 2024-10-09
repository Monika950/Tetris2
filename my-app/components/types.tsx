export enum Block {
    S='S',
    Z='Z',
    J='J',
    L='L',
    I='I',
    O='O',
    T='T',
};

export enum Empty {
    E = 'E',
};

export type SquareType = Block | Empty;

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





