import { useReducer, useEffect, useMemo } from "react";
import { SquareType, Empty} from "../components/types";
import { getRandomBlock, rotateBlock, clearRows } from "../components/Blocks";
import { writeFile } from "../api/file";

interface BoardState {
  board: SquareType[][];
  currentBlock: SquareType[][] | null;
  nextBlock: SquareType[][] | null;
  currentPosition: { row: number; column: number } | null;
  score: number;
  gameOver: boolean;
}

type Action =
  | { type: "start" }
  | {
      type: "new block";
      payload: { block: SquareType[][]; nextBlock: SquareType[][] };
    }
  | { type: "move down" }
  | { type: "move left" }
  | { type: "move right" }
  | { type: "rotate" };

const getInitialBoard = (): SquareType[][] =>
  Array.from({ length: 20 }, () => Array(10).fill(Empty.E));

function canMove(
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

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        board: getInitialBoard(),
        currentBlock: null,
        nextBlock: null,
        currentPosition: null,
        gameOver: false,
        score: 0,
      };

    case "new block": {
      const { block, nextBlock} = action.payload;

      return {
        ...state,
        currentBlock: block,
        nextBlock: nextBlock,
        currentPosition: { row: 0, column: 4 },
      };
    }

    case "move down": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = [...state.currentBlock];
      const { row, column } = state.currentPosition;
      const score = state.score;

      if (!canMove(moveBoard, moveShape, { row: row + 1, column })) {

        for (let r = 0; r < moveShape.length; r++) {
          for (let c = 0; c < moveShape[r].length; c++) {
            if (moveShape[r][c] !== Empty.E) {
              moveBoard[row + r][column + c] = moveShape[r][c];
            }
          }
        }

        const { board: newBoard, score: newScore } = clearRows(moveBoard, score);
        console.log(score);

        if (row === 0) {
          return {
            ...state,
            board: newBoard,
            currentBlock: null,
            currentPosition: null,
            gameOver: true,
            score: 0,
          };
        }

        writeFile(`block stops at row: ${row}, column: ${column}`);

        return {
          ...state,
          board: newBoard,
          currentBlock: state.nextBlock, 
          nextBlock: getRandomBlock(), 
          currentPosition: { row: 0, column: 4 },
          score: newScore,
        };
      }

      return {
        ...state,
        board: moveBoard,
        currentBlock: state.currentBlock,
        nextBlock: state.nextBlock,
        currentPosition: { row: row + 1, column },
        score: score,
      };
    }

    case "move left": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = [...state.currentBlock];
      const { row, column } = state.currentPosition;

      if (!canMove(moveBoard, moveShape, { row, column: column - 1 })) {
        return {
          ...state,
          currentBlock: state.currentBlock,
          currentPosition: { row: row, column: column },
        };
      }

      return {
        ...state,
        currentBlock: state.currentBlock,
        currentPosition: { row: row, column: column - 1 },
      };
    }

    case "move right": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const moveShape = [...state.currentBlock];
      const { row, column } = state.currentPosition;

      if (!canMove(moveBoard, moveShape, { row, column: column + 1 })) {
        return {
          ...state,
          currentBlock: state.currentBlock,
          currentPosition: { row, column },
        };
      }

      return {
        ...state,
        currentBlock: state.currentBlock,
        currentPosition: { row, column: column + 1 },
      };
    }

    case "rotate": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const moveBoard = [...state.board];
      const currentShape = [...state.currentBlock];
      const { row, column } = state.currentPosition;

      const rotatedShape = rotateBlock(currentShape);
      if (canMove(moveBoard, rotatedShape, { row, column })) {
        return {
          ...state,
          board: moveBoard,
          currentBlock: rotatedShape,
          currentPosition: state.currentPosition,
        };
      }

      return state;
    }

    default:
      return state;
  }
}

const InitialBoardState = {
  board: [],
  currentBlock: null,
  currentPosition: null,
  nextBlock: null,
  score: 0,
  gameOver: false,
}

export default function useBoard() {
  const [board, setBoard] = useReducer(reducer, InitialBoardState);

  useEffect(() => {
    if (!board.gameOver) {
      const intervalId = setInterval(() => {
        setBoard({ type: "move down" });
      }, 1000); 

      return () => clearInterval(intervalId);
    }
  }, [board.gameOver]);

  useEffect(() => {
    if (board.board.length && !board.currentBlock && !board.currentPosition) {
      newBlock();
    } 
  },  [board.board, board.currentBlock, board.currentPosition]);

  const startNewGame = useMemo(() => () => {
    setBoard({ type: "start" });
  }, [])

  const newBlock = () => {
    setBoard({
      type: "new block",
      payload: 
      {
        block: getRandomBlock(),
        nextBlock: getRandomBlock(), 
      },
    });
  };

  const moveDown = useMemo(() => () => {
    if (!board.gameOver) {
      setBoard({ type: "move down" });
    }
  }, [board.gameOver]);

  
  const moveLeft = useMemo(() => () => {
    if (!board.gameOver) {
      setBoard({ type: "move left" });
    }
  }, [board.gameOver]);

  const moveRight = useMemo(() => () => {
    if (!board.gameOver) {
      setBoard({ type: "move right" });
    }
  }, [board.gameOver]);

  const rotate = useMemo(() => () => {
    if (!board.gameOver) {
      setBoard({ type: "rotate" });
    }
  }, [board.gameOver]);

  return {
    board: board.board,
    block: board.currentBlock,
    position: board.currentPosition,
    startNewGame,
    newBlock,
    moveDown,
    moveLeft,
    moveRight,
    rotate,
    gameOver: board.gameOver,
    score: board.score,
    nextBlock: board.nextBlock, 
  };
}
