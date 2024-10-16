import "./App.css";
import { useCallback, useEffect } from "react";
import Board from "../components/Board";
import useBoard from "../hooks/useBoard";


function App() {
  const { board, block, position, startNewGame, newBlock, moveDown, moveLeft, moveRight, rotate, gameOver } = useBoard();

  useEffect(() => {
      startNewGame();
  }, [gameOver]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case "ArrowDown":
          moveDown();
          break;
        default:
          break;
      }
    },
    [moveLeft, moveDown, moveRight]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <Board board={board} block={block} position={position}/>
    </div> 
  );
}

export default App;
