import "./board.css";
import { useMemo } from "react";
import Square from "./Square";
import { SquareType, Empty,Block } from "./types";


interface BoardProps {
  board: SquareType[][];
  block: Block | null ;
  position: { row: number; column: number } | null;
}

function Board({ board, block, position }: BoardProps) {
  
  const combinedBoard = useMemo(() => {
    if (block && position) {
        return board;
});
    }

    return board;
  }, [board, block, position]);
    
  return (
    <>
    <div className="board">
      {combinedBoard.length && combinedBoard[0].map((square, colIndex) => (
        <div key={colIndex} className="column">
          {combinedBoard.map((_row, rowIndex) => (
            <Square
              key={`${colIndex}-${rowIndex}`}
              type={board[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div></>
  );
}


export default Board;