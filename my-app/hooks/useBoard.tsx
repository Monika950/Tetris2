import { useReducer, useEffect } from "react";
import { SquareType, Empty, Block } from "../components/types";
import { BlockShapes } from "../components/Blocks";
import { getRandomBlock} from '../components/Blocks';

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
  Array(10).fill(Empty.E) // function
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
        debugger
        if (!state.currentBlock || !state.currentPosition) return state;
      
        const moveBoard = [...state.board];
        const moveShape = BlockShapes[state.currentBlock];
        const { row, column } = state.currentPosition;
      
        const canMoveDown = (moveShape: SquareType[][]) => {
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
            currentBlock: null,
            currentPosition: null,

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

        case "move left": //mestene na proverkite i mesteneto
    if (!state.currentBlock || !state.currentPosition) return state;

    const moveBoardLeft = [...state.board];
    const moveShapeLeft = BlockShapes[state.currentBlock];
    const { row: rowLeft, column: columnLeft } = state.currentPosition;

    const canMoveLeft = (moveShape: SquareType[][]) => {
        if ((columnLeft-1) < 0) return false; 

        for (let r = 0; r < moveShape.length; r++) {
            if (moveShape[r][columnLeft-1] !== Empty.E) {
            const newRow = rowLeft + r - 1; 
            if ((columnLeft-1)< 0 || moveBoardLeft[newRow][columnLeft-1] !== Empty.E) {
                return false;
            }
            }
        }
        return true;
        }

        
    

    if (!canMoveLeft(moveShapeLeft)) {
        return {
        ...state,
        board: moveBoardLeft,
        currentBlock: state.currentBlock,
        currentPosition: { row: rowLeft, column: columnLeft },
        };
  }

  
  for (let r = 0; r < moveShapeLeft.length; r++) {
    for (let c = 0; c < moveShapeLeft[r].length; c++) {
      if (moveShapeLeft[r][c] !== Empty.E) {
        moveBoardLeft[rowLeft + r][columnLeft + c] = Empty.E;
      }
    }
  }

  const newColumnPosition = columnLeft - 1; 

  for (let r = 0; r < moveShapeLeft.length; r++) {
    for (let c = 0; c < moveShapeLeft[r].length; c++) {
      if (moveShapeLeft[r][c] !== Empty.E) {
        moveBoardLeft[rowLeft + r][newColumnPosition + c] = moveShapeLeft[r][c];
      }
    }
  }

  return {
    ...state,
    board: moveBoardLeft,
    currentBlock: state.currentBlock,
    currentPosition: { row: rowLeft, column: newColumnPosition }
  };


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
    debugger
    if (board.board.length && !board.currentBlock && !board.currentPosition) {
      console.log("Block is no longer active:", board);
      newBlock();
    }
  }, [board.board, board.currentBlock]);
  
  const startGame = () => {
    setBoard({ type: "start" });
  };
  
  const newBlock = () => {
    setBoard({
        type: "new block",
        payload: {
          position: { row: 0, column: 4 },  
          block: getRandomBlock(),          
        }
      });
  };
  

  const moveDown = () => {
    setBoard({ type: "move down" });
  };

  const moveLeft = () => {
    setBoard({ type: "move left" });
  };

  return {
    board: board.board,
    startGame,
    newBlock,
    moveDown,
    moveLeft
  };
}
