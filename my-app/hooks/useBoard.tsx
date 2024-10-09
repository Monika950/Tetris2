import { useReducer } from "react";
import { SquareType, Empty, Block, BlockShapes} from "../components/types";

interface BoardState {
  board: SquareType[][];
}

type Action = 
  | { type: "start"}
  | { type: "place block"; payload: { position: { row: number, column: number}; block: Block};}
  | { type: "move down"; payload: { position: { row: number, column: number }; block: Block } };

const initialBoard: SquareType[][] = Array.from({ length: 10 }, () => Array(20).fill(Empty.E));

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        board: initialBoard,
      };

      case "place block":
      const { position, block } = action.payload; 
      const newBoard = [...state.board]; 
      const blockShape = BlockShapes[block]; 

      for (let row = 0; row < blockShape.length; row++) {
        for (let col = 0; col < blockShape[row].length; col++) {
          if (blockShape[row][col] !== Empty.E) {
            newBoard[position.row + row][position.column + col] = blockShape[row][col];
          }
        }
      }

      return {
        ...state,
        board: newBoard, 
      };

    case "move down":

    const { position: movePosition, block: moveBlock } = action.payload; 
      const moveBoard = [...state.board]; 
      const moveBlockShape = BlockShapes[moveBlock]; 

      for (let row = 0; row < moveBlockShape.length; row++) {
        for (let col = 0; col < moveBlockShape[row].length; col++) {
          if (moveBlockShape[row][col] !== Empty.E) {
            moveBoard[movePosition.row + row][movePosition.column + col] = Empty.E; // Clear current position
          }
        }
      }

      const newRowPosition = movePosition.row + 1;

      // Place the block in the new position
      for (let row = 0; row < moveBlockShape.length; row++) {
        for (let col = 0; col < moveBlockShape[row].length; col++) {
          if (moveBlockShape[row][col] !== Empty.E) {
            moveBoard[newRowPosition + row][movePosition.column + col] = moveBlockShape[row][col];
          }
        }
      }

      return {
        ...state,
        board: moveBoard, 
      };

    default:
      return state;
  }
}


export default function useBoard( )
{
    const [board, setBoard]= useReducer(reducer,{ board: initialBoard });

    const startGame = () => {
        setBoard({ type: "start" });
    }

    const placeBlock = (position: { row: number; column: number }, block: Block) => {
        setBoard({ type: "place block", payload: { position, block } }); 
      };

      const moveDown = (position: { row: number; column: number }, block: Block) => {
        setBoard({ type: "move down", payload: { position, block } });
      };

      return {
        board: board.board,
        startGame,
        placeBlock,
        moveDown,
      };
    }
