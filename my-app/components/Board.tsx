import './board.css'
import Square from './Square';

interface BoardProps
{
    board: Square[][];
}

function Board()
{
    const rows = 10; 
    const columns = 20;

    const board: JSX.Element[][] = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => <Square/>)
      );


    return(
        <div className='board'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((square, colIndex) => (
              <Square key={`${rowIndex}-${colIndex}`} />
            ))}
          </div>
        ))}
      </div>
    )
};

export default Board;