import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { openFile, writeFile, closeFile } from "../api/file";


function App() {
  const { board, block, position, startNewGame, newBlock, moveDown, moveLeft, moveRight, rotate, gameOver,score, nextBlock } = useBoard();

  const [gameNumber, setGameNum] = useState(1);

  useEffect(() => {
      openFile(`game_${gameNumber}.txt`);
      startNewGame();

      if(gameOver) {
        closeFile();
        setGameNum(gameNumber+1);
      }
  }, [gameOver, startNewGame, gameNumber]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          writeFile('block left\n');
          break;
        case 'ArrowRight':
          moveRight();
          writeFile('block right\n');
          break;
        case 'ArrowUp':
          rotate();
          writeFile('block rotate\n');
          break;
        case "ArrowDown":
          moveDown();
          writeFile('block move down\n');
          break;
        default:
          break;
      }
    },
    [moveLeft, moveDown, moveRight,rotate]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <Board board={board} block={block} position={position}/>
      <ScoreBoard score={score}/>
      <Preview shape={nextBlock}/>
    </div> 
  );
}

export default App;
