import "./App.css";
import { useCallback, useEffect } from "react";
import Board from "../components/Board";
import useBoard from "../hooks/useBoard";
import { Block } from "../components/types";
import { getRandomBlock } from "../components/Blocks";

function App() {
  const { board, startGame, newBlock, moveDown, moveLeft } = useBoard();

  useEffect(() => {
    startGame();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        // case 'ArrowRight':
        //   moveRight();
        //   break;
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
    [moveLeft, moveDown]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <Board board={board} />
    </div> // board , block i position
  );
}

export default App;
