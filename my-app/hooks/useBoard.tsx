import { useReducer, useEffect } from "react";
import { SquareType, Empty, Block } from "../components/types";
import { BlockShapes } from "../components/Blocks";
import { getRandomBlock } from "../components/Blocks";

interface BoardState {
  board: SquareType[][];
  currentBlock: Block | null;
  currentPosition: { row: number; column: number } | null;
}

type Action =
  | { type: "start" }
  | {
      type: "new block";
      payload: { position: { row: number; column: number }; block: Block };
    }
  | { type: "move down" }
  | { type: "move left" }
  | { type: "move right" }
  | { type: "rotate" };

const getInitialBoard = (): SquareType[][] =>
  Array.from({ length: 20 }, () => Array(10).fill(Empty.E));

function canMoveDown(
  board: SquareType[][],
  blockShape: SquareType[][],
  position: { row: number; column: number }
): boolean {
  const { row, column } = position;
  const nextRow = row + blockShape.length;

  if (nextRow >= board.length) return false;

  for (let c = 0; c < blockShape[0].length; c++) {
    if (blockShape[blockShape.length - 1][c] !== Empty.E) {
      if (board[nextRow][column + c] !== Empty.E) return false;
    }
  }

  return true;
}

function canMoveLeft(
  board: SquareType[][],
  blockShape: SquareType[][],
  position: { row: number; column: number }
): boolean {
  const { row, column } = position;
  const prevCol = column - 1;
  if (prevCol < 0) return false;

  for (let r = 0; r < blockShape.length; r++) {
    if (blockShape[r][prevCol] !== Empty.E) {
      if (board[row + r][prevCol] !== Empty.E) {
        return false;
      }
    }
  }
  return true;
}

function canMoveRight(
  board: SquareType[][],
  blockShape: SquareType[][],
  position: { row: number; column: number }
): boolean {
  const { row, column } = position;
  const nextCol = column + blockShape[0].length;
  if (nextCol >= board[0].length) return false;

  for (let r = 0; r < blockShape.length; r++) {
    if (blockShape[r][nextCol] !== Empty.E) {
      if (board[row + r][nextCol] !== Empty.E) {
        return false;
      }
    }
  }
  return true;
}

function canMove(
  board: SquareType[][],
  blockShape: SquareType[][],
  position: { row: number; column: number },
  direction: "down" | "left" | "right"
): boolean {
  const { row, column } = position;
  const shapeHeight = blockShape.length;
  const shapeWidth = blockShape[0].length;

  let newRow;
  let newCol;

  switch (direction) {
    case "down": {
      newRow = row + shapeHeight;
      newCol = column;
      break;
    }
    case "left": {
      newRow = row;
      newCol = column - 1;
      break;
    }
    case "right": {
      newRow = row;
      newCol = column + shapeWidth;
      break;
    }
  }

  if (
    newRow >= board.length ||
    newRow < 0 ||
    newCol >= board[0].length ||
    newCol < 0
  ) {
    return false;
  }

  if (direction === "left" || direction === "right") {
    for (let r = 0; r < blockShape.length; r++) {
      if (blockShape[r][newCol] !== Empty.E) {
        if (board[row + r][newCol] !== Empty.E) {
          return false;
        }
      }
    }
    
    return true;
  } else {
    for (let c = 0; c < blockShape[0].length; c++) {
      if (blockShape[blockShape.length - 1][c] !== Empty.E) {
        if (board[newRow][column + c] !== Empty.E) return false;
      }
    }
    
    return true;
  }
}

function canRotate() {}

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        board: getInitialBoard(),
        currentBlock: null,
        currentPosition: null,
      };

    case "new block": {
      const { position, block } = action.payload;
      //const newBoard = [...state.board];  ??

      return {
        ...state,
        //board: newBoard,
        currentBlock: block,
        currentPosition: position,
      };
    }

    case "move down": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = BlockShapes[state.currentBlock];
      const { row, column } = state.currentPosition;

      if (!canMove(moveBoard, moveShape, { row, column }, "down")) {
        console.log("cannot move down");

        for (let r = 0; r < moveShape.length; r++) {
          for (let c = 0; c < moveShape[r].length; c++) {
            if (moveShape[r][c] !== Empty.E) {
              moveBoard[row + r][column + c] = moveShape[r][c];
            }
          }
        }

        return {
          ...state,
          board: moveBoard,
          currentBlock: null,
          currentPosition: null,
        };
      }

      return {
        ...state,
        board: moveBoard,
        currentBlock: state.currentBlock,
        currentPosition: { row: row + 1, column },
      };
    }

    case "move left": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = BlockShapes[state.currentBlock];
      const { row: row, column: column } = state.currentPosition;

      if (!canMove(moveBoard, moveShape, { row, column }, "left")) {
        return {
          ...state,
          board: moveBoard,
          currentBlock: state.currentBlock,
          currentPosition: { row: row, column: column },
        };
      }

      return {
        ...state,
        board: moveBoard,
        currentBlock: state.currentBlock,
        currentPosition: { row: row, column: column - 1 },
      };
    }

    case "move right": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = BlockShapes[state.currentBlock];
      const { row, column } = state.currentPosition;

      if (!canMove(moveBoard, moveShape, { row, column },'right')) {
        return {
          ...state,
          //board: moveBoard,
          currentBlock: state.currentBlock,
          currentPosition: { row, column },
        };
      }

      return {
        ...state,
        board: moveBoard,
        currentBlock: state.currentBlock,
        currentPosition: { row, column: column + 1 },
      };
    }

    default:
      return state;
  }
}

export default function useBoard() {
  const [board, setBoard] = useReducer(reducer, {
    board: [],
    currentBlock: null,
    currentPosition: null,
  });

  useEffect(() => {
    if (board.board.length && !board.currentBlock && !board.currentPosition) {
      console.log("Block is no longer active:", board);
      newBlock();
    }
  }, [board, board.board, board.currentBlock]);

  const startGame = () => {
    setBoard({ type: "start" });
  };

  const newBlock = () => {
    setBoard({
      type: "new block",
      payload: {
        position: { row: 0, column: 4 },
        block: getRandomBlock(),
      },
    });
  };

  const moveDown = () => {
    setBoard({ type: "move down" });
  };

  const moveLeft = () => {
    setBoard({ type: "move left" });
  };

  const moveRight = () => {
    setBoard({ type: "move right" });
  };

  return {
    board: board.board,
    block: board.currentBlock,
    position: board.currentPosition,
    startGame,
    newBlock,
    moveDown,
    moveLeft,
    moveRight,
  };
}
