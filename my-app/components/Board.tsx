import React from "react";
import "./board.css";
import { useMemo } from "react";
import Square from "./Square";
import { SquareType, Empty} from "./types";

interface BoardProps {
  board: SquareType[][];
  block: SquareType[][] | null;
  position: { row: number; column: number } | null;
}

function Board({ board, block, position }: BoardProps) {

  const combinedBoard = useMemo(() => {

    const boardCopy = board.map(row => [...row]);

    if (block && position) {
      const shape = [...block];
      const blockHeight = shape.length;
      const blockWidth = shape[0].length;

      for (let r = 0; r < blockHeight; r++) {
        for (let c = 0; c < blockWidth; c++) {
          if (shape[r][c] !== Empty.E) {
            const boardRow = position.row + r;
            const boardCol = position.column + c;

            if (
              boardRow >= 0 &&
              boardRow < boardCopy.length &&
              boardCol >= 0 &&
              boardCol < boardCopy[0].length
            ) {
              boardCopy[boardRow][boardCol] = shape[r][c];
            }
          }
        }
      }
    }

    return boardCopy;
  }, [board, block, position]);

  return (
    <div className="board">
      {combinedBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((square, colIndex) => (
            <Square key={`${rowIndex}-${colIndex}`} type={square} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
