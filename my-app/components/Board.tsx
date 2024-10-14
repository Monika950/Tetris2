import "./board.css";
import Square from "./Square";
import { SquareType } from "./types";

interface BoardProps {
  board: SquareType[][];
}

function Board({ board }: BoardProps) {
  return (
    //     <div className='board'>
    //     {board.map((row, rowIndex) => (
    //       <div key={rowIndex} className='row'>
    //         {row.map((square, colIndex) => (
    //           <Square key={`${rowIndex}-${colIndex}`} type={square} />
    //         ))}
    //       </div>
    //     ))}
    //   </div>
    <div className="board">
      {board.length && board[0].map((square, colIndex) => (
        <div key={colIndex} className="column">
          {board.map((row, rowIndex) => (
            <Square
              key={`${colIndex}-${rowIndex}`}
              type={board[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
