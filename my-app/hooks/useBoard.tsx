import { useReducer } from "react";
import { SquareType, Empty, Block } from "../components/types";
import { BlockShapes } from "../components/Blocks";

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

const initialBoard: SquareType[][] = Array.from({ length: 20 }, () =>
  Array(10).fill(Empty.E)
);

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "start":
        console.log(initialBoard.length,initialBoard[0].length);
      return {
        ...state,
        board: initialBoard,
        currentBlock: null,
        currentPosition: null,
      };

    case "new block":
      const { position, block } = action.payload;
      const newBoard = [...state.board];
      const blockShape = BlockShapes[block];

      for (let row = 0; row < blockShape.length; row++) {
        for (let col = 0; col < blockShape[row].length; col++) {
          if (blockShape[row][col] !== Empty.E) {
            newBoard[position.row + row][position.column + col] =
              blockShape[row][col];
          }
        }
      }

      return {
        ...state,
        board: newBoard,
        currentBlock: block,
        currentPosition: position,
      };

      case "move down":
        if (!state.currentBlock || !state.currentPosition) return state;
      
        const moveBoard = [...state.board];
        const moveShape = BlockShapes[state.currentBlock];
        const { row, column } = state.currentPosition;
      
        const canMoveDown = (moveShape) => {
          const lastRow = moveShape.length;
          
          if ((row + lastRow) >= moveBoard.length) return false;
      
          for (let c = 0; c < moveShape[0].length; c++) {
            if (moveShape[lastRow - 1][c] !== Empty.E) {
              const newCol = column + c;
              if (moveBoard[row + lastRow][newCol] !== Empty.E) {
                return false;
              }
            }
          }
          
          return true;
        };
      
        if (!canMoveDown(moveShape)) {
          return {
            ...state,
            board: moveBoard,
            currentBlock: state.currentBlock,
            currentPosition: { row, column },
          };
        }
    
        for (let r = 0; r < moveShape.length; r++) {
          for (let c = 0; c < moveShape[r].length; c++) {
            if (moveShape[r][c] !== Empty.E) {
              moveBoard[row + r][column + c] = Empty.E;
            }
          }
        }
      
        const newRowPosition = row + 1; 

        for (let r = 0; r < moveShape.length; r++) {
          for (let c = 0; c < moveShape[r].length; c++) {
            if (moveShape[r][c] !== Empty.E) {
              moveBoard[newRowPosition + r][column + c] = moveShape[r][c];
            }
          }
        }
      
        return {
          ...state,
          board: moveBoard,
          currentBlock: state.currentBlock,
          currentPosition: { row: newRowPosition, column }
        };
      

    default:
      return state;
  }
}

export default function useBoard() {
  const [board, setBoard] = useReducer(reducer, {
    board: initialBoard,
    currentBlock: null,
    currentPosition: null,
  });

  const startGame = () => {
    setBoard({ type: "start" });
  };

  const newBlock = (
    position: { row: number; column: number },
    block: Block
  ) => {
    setBoard({ type: "new block", payload: { position, block } });
  };

  const moveDown = () => {
    setBoard({ type: "move down" });
  };

  return {
    board: board.board,
    startGame,
    newBlock,
    moveDown,
  };
}
