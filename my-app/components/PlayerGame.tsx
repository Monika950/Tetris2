import React, { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import RestartMenu from "../components/RestartMenu";
import { openFile, closeFile } from "../api/file";
import { getRandomBlock, rotateBlock, canMove} from "../components/Blocks";
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
    pause,
    freezeBlock,
  } = useBoard();

  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const handleGameStart = useCallback((): void => {
    openFile()
      .then(() => {
        startNewGame();
        setIsGameStarted(true);
      })
      .catch(error => console.error("Error opening file:", error));
  }, [startNewGame, setIsGameStarted]);
  

  useEffect(() => {
    if (!isGameStarted) {
      handleGameStart();
    }
  }, [handleGameStart, isGameStarted]);

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
    
      const currentBlock = getRandomBlock();
      const nextBlock = getRandomBlock();
      
      writeFile(`${currentBlock} ${nextBlock}\n`);

      newBlock(currentBlock, nextBlock);
    }
  }, [board, block, position, newBlock]);

  useEffect(() => {
    if (isGameStarted && !pause) {
      const intervalId = setInterval(() => {
        if (canMove(board, block, { row: position.row + 1, column: position.column })) {
          moveDown();
          writeFile("mD\n");
        } else {
          freezeBlock();
          writeFile("mB\n");
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [moveDown, isGameStarted, pause, position, board, block, freezeBlock]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isGameStarted || pause || !position) return;

      switch (event.key) {
          case "ArrowLeft":
            if (canMove(board, block, { row: position.row, column: position.column-1 })) {
              moveLeft();
              writeFile("mL\n");
            }
            break;
        case "ArrowRight":
          if (canMove(board, block, { row: position.row, column: position.column+1 })) {
              moveRight();
              writeFile("mR\n");
            }
          break;
          case "ArrowUp": {
            const rotated = rotateBlock(block);
            if (canMove(board, rotated, { row: position.row, column: position.column })) {
                rotate();
                writeFile("mU\n");
            }
            break;
        }
        case "ArrowDown":
          if (canMove(board, block, { row: position.row + 1, column: position.column })) {
            moveDown();
            writeFile("mD\n");
          } else {
            freezeBlock(board, block, { row: position.row, column: position.column });
            writeFile("mB\n");
          }   //povtarq se
          break;
        default:
          break;
      }
    },
    [isGameStarted, pause, position, board, block, moveLeft, moveRight, rotate, moveDown]
  );

  const handleCloseMenu = () => {
    if (pause) pauseGame();
  };
  
  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game" autoFocus>
      <button onClick={pauseGame}>{pause ? "Resume" : "Pause"}</button>

      <RestartMenu
        score={score}
        isOpen={gameOver || pause}
        onClose={handleCloseMenu}
        onClick={handleGameStart}
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
