import "./App.css";
import { useCallback, useEffect } from "react";
import Board from "../components/Board";
import useBoard from "../hooks/useBoard";


function App() {
  const { board, block, position, startGame, newBlock, moveDown, moveLeft, moveRight } = useBoard();

  useEffect(() => {
    startGame();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        // case 'ArrowUp':
        //   rotateBlock();
        //   break;
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
