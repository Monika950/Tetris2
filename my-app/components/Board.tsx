import "./board.css";
import { useMemo } from "react";
import Square from "./Square";
import { SquareType, Empty,Block } from "./types";


interface BoardProps {
  board: SquareType[][];
  block?: Block;
  position?: { row: number; column: number };
}

function Board({ board, block, position }: BoardProps) {
  
  if(block && position)
  {
  const combinedBoard = useMemo(() =>  //????
    board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        const blockRow = rowIndex - position.row;
        const blockCol = colIndex - position.column;
  
        if (
          blockRow >= 0 &&
          blockRow < block.length &&
          blockCol >= 0 &&
          blockCol < block[0].length &&
          block[blockRow][blockCol] !== Empty.E
        ) {
          return block[blockRow][blockCol];
        }
  
        return square;
      });
    }),
    [board, block, position]
  );
  }
  return (
    <>
    <div className="board">
      {board.length && board[0].map((square, colIndex) => (
        <div key={colIndex} className="column">
          {board.map((_row, rowIndex) => (
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