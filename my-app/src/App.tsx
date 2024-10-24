import "./App.css";
import { useCallback, useEffect } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { openFile, writeFile, closeFile } from "../api/file";

function App() {
  const {
    board,
    block,
    position,
    startNewGame,
    newBlock,
    moveDown,
    moveLeft,
    moveRight,
    rotate,
    gameOver,
    score,
    nextBlock,
  } = useBoard();

  useEffect(() => {
    if(board.length) return

    openFile()
      .then(() => {
        return writeFile('start');
      }).then(() => {
        startNewGame();
      })
  }, [startNewGame, board.length]);

  useEffect(() => {
    if(gameOver){
      writeFile(`game over\n`).then(() => {
        return closeFile();
      }).then(() => {
        return openFile()
      }).then(() => {
        return writeFile('start');
      }).then(() => {
        startNewGame();
      })
    }
}, [gameOver, startNewGame]);


  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          rotate();
          break;
        case "ArrowDown":
          moveDown()
          break;
        default:
          break;
      }
    },
    [moveLeft, moveDown, moveRight, rotate]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default App;
