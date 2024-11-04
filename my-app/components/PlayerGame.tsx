import { useCallback, useEffect, useRef, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import RestartMenu from "../components/RestartMenu";
import { openFile, closeFile } from "../api/file";
import { getRandomBlock } from "../components/Blocks";
import { writeFile } from "../api/file";

function PlayerGame() {
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
    pauseGame,
    pause
  } = useBoard();

  const [isGameStarted, setIsGameStarted] = useState(false);
  const currentBlockRef = useRef(block);

  useEffect(() => {
    if (!isGameStarted) {
      openFile()
        .then(() => {
          startNewGame();
          setIsGameStarted(true);
        })
        .catch(error => console.error("Error opening file:", error));
    }
  }, [isGameStarted, startNewGame]);

  useEffect(() => {
    if (gameOver && isGameStarted) {
      closeFile()
        .then(() => {
          setIsGameStarted(false);
        });
    }
  }, [gameOver, isGameStarted]);

  useEffect(() => {
    if (board.length && !block && !position) {
    //if (board.length && block && currentBlockRef.current !== block){
      const currentBlock = getRandomBlock();
      const nextBlock = getRandomBlock();
       
      //writeFile(`mB\n`);
      
      writeFile(`${currentBlock} ${nextBlock}\n`);

      newBlock(currentBlock, nextBlock);
      currentBlockRef.current = currentBlock;
    }
  }, [board, block, position, newBlock]);

  useEffect(() => {
    if (isGameStarted && !pause) {
      const intervalId = setInterval(() => {
        moveDown();
        writeFile('mD\n');
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [moveDown, isGameStarted, pause]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isGameStarted || pause) return;
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          writeFile('mL\n');
          break;
        case "ArrowRight":
          moveRight();
          writeFile('mR\n');
          break;
        case "ArrowUp":
          rotate();
          writeFile('mU\n');
          break;
        case "ArrowDown":
          moveDown();
          writeFile('mD\n');
          break;
        default:
          break;
      }
    },
    [moveLeft, moveDown, moveRight, rotate, isGameStarted, pause]
  );

  const handleCloseMenu = () => {
    if (pause) pauseGame();
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <button onClick={pauseGame}>{pause ? "Resume" : "Pause"}</button>

      <RestartMenu
        score={score}
        isOpen={gameOver || pause}
        onClose={handleCloseMenu}
        gameOver={gameOver}
        pause={pause}
      />

      {isGameStarted && (
        <>
          <Board board={board} block={block} position={position} />
          <ScoreBoard score={score} />
          <Preview shape={nextBlock} />
        </>
      )}
    </div>
  );
}

export default PlayerGame;
