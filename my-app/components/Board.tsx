import "./board.css";
import { useMemo } from "react";
import Square from "./Square";
import { SquareType, Empty,Block } from "./types";
import { BlockShapes } from "./Blocks";


interface BoardProps {
  board: SquareType[][];
  block: Block | null ;
  position: { row: number; column: number } | null;
}

function Board({ board, block, position }: BoardProps) {

  const shape = BlockShapes[block!];
  
  // const combinedBoard = useMemo(() => {
  //   if (block && position) {
  //       return board;

  //   }

  //   return board;
  // }, [board, block, position])
    
  return (
    <>
    <div className="board">
      {
        board.length && board.map((row, rowIndex) =>
          <div key={rowIndex} className="row">
            {row.map((square, colIndex) => {
              if(shape) {
                const w = shape[0].length
                const h = shape.length

                if(rowIndex >= position.row && rowIndex < position.row + h &&
                  colIndex >= position.column && colIndex < position.column + w
                )
                  square = shape[rowIndex - position?.row][colIndex - position?.column];
              }
              return <Square
                key={`${colIndex}-${rowIndex}`}
                type={square}
              />
            }
            )}
          </div>
        )
      }

      {/* {combinedBoard.length && combinedBoard[0].map((square, colIndex) => (
        <div key={colIndex} className="column">
          {combinedBoard.map((_row, rowIndex) => (
            <Square
              key={`${colIndex}-${rowIndex}`}
              type={board[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))} */}
    </div></>
  );
}


export default Board;