import { useReducer, useMemo } from "react";
import { SquareType, Empty } from "../components/GameComps/types";
import {rotateBlock} from "../components/GameComps/blockOperations.ts";
import {clearRows} from "../components/GameComps/boardOperations.ts";

interface BoardState {
  board: SquareType[][];
  currentBlock: SquareType[][] | null;
  nextBlock: SquareType[][] | null;
  currentPosition: { row: number; column: number } | null;
  score: number;
  gameOver: boolean;
  pause: boolean;
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
  | { type: "rotate" }
  | { type: "freeze" }
  | { type: "pause" };

const getInitialBoard = (): SquareType[][] =>
  Array.from({ length: 20 }, () => Array(10).fill(Empty.E));

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "pause":
      {
        return {
          ...state,
          pause: !state.pause,
        };
      };
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
      const { block, nextBlock } = action.payload;
      
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
      const { row, column } = state.currentPosition;
      const score = state.score;

      return {
        ...state,
        board: moveBoard,
        currentBlock: state.currentBlock,
        nextBlock: state.nextBlock,
        currentPosition: { row: row + 1, column },
        score: score,
      };
    }
    case "freeze": {
      if (!state.currentBlock || !state.currentPosition) return state;

      const board = [...state.board];
      const blockShape = [...state.currentBlock];
      const { row, column } = state.currentPosition;
      const score = state.score;
      
      for (let r = 0; r < blockShape.length; r++) {
        for (let c = 0; c < blockShape[r].length; c++) {
          if (blockShape[r][c] !== Empty.E) {
            board[row + r][column + c] = blockShape[r][c];
          }
        }
      }

      const { board: newBoard, score: newScore } = clearRows(board, score);

      if (row === 0) {
        return {
          ...state,
          board: newBoard,
          currentBlock: null,
          currentPosition: null,
          gameOver: true,
          score: newScore,
        };
      }

        return {
          ...state,
          board: newBoard,
          currentBlock: null,
          score: newScore,
        };
    }
    case "move left": {
      if (!state.currentBlock || !state.currentPosition) return state;

      return {
        ...state,
        currentBlock: state.currentBlock,
        currentPosition: { row:state.currentPosition.row, column: state.currentPosition.column - 1 },
      };
    }

    case "move right": {
      if (!state.currentBlock || !state.currentPosition) return state;

      return {
        ...state,
        currentBlock: state.currentBlock,
        currentPosition: {row:state.currentPosition.row, column: state.currentPosition.column + 1 },
      };
    }

    case "rotate": {
      if (!state.currentBlock || !state.currentPosition) return state;
 
      return {
        ...state,
        currentBlock: rotateBlock(state.currentBlock),
        currentPosition: state.currentPosition,
      };
    }

    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
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
  
  const moveDown = useMemo(() => () => {
    if (!board.gameOver && !board.pause) {
      setBoard({ type: "move down" });
    }
  }, [board.gameOver, board.pause]);

  const freezeBlock = useMemo(() => () => {
    if (!board.gameOver && !board.pause) {
      setBoard({ type: "freeze" });
    }
  }, [board.gameOver, board.pause]);

  const startNewGame = useMemo(() => () => {
    setBoard({ type: "start" });
  }, [])

  const newBlock = (block:SquareType[][],next:SquareType[][]) => {
    setBoard({
      type: "new block",
      payload:
      {
        block: block,
        nextBlock: next,
      },
    });
  };

  const moveLeft = useMemo(() => () => {
    if (!board.gameOver && !board.pause) {
      setBoard({ type: "move left" });
    }
  }, [board.gameOver, board.pause]);

  const moveRight = useMemo(() => () => {
    if (!board.gameOver && !board.pause) {
      setBoard({ type: "move right" });
    }
  }, [board.gameOver, board.pause]);

  const rotate = useMemo(() => () => {
    if (!board.gameOver && !board.pause) {
      setBoard({ type: "rotate" });
    }
  }, [board.gameOver, board.pause]);

  const pauseGame = useMemo(() => () => {
    if (!board.gameOver) {
      setBoard({ type: "pause" });
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
    pauseGame,
    pause: board.pause,
    freezeBlock
  };
}
