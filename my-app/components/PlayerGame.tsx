import React, { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import RestartMenu from "../components/RestartMenu";
import { openFile, closeFile } from "../api/file";
import { getRandomBlock, rotateBlock, canMove} from "../components/Blocks";
//import { writeFile } from "../api/file";

import { socket } from '../api/socket';

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
      
      socket.emit("gameStart");
  }, [startNewGame, setIsGameStarted]);
  

  useEffect(() => {
    if (!isGameStarted) {
      handleGameStart();
    }
  }, [handleGameStart, isGameStarted]);

  useEffect(() => {//??
    socket.on("gameStartAck", (data) => {
      console.log(data.message); 
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (gameOver && isGameStarted) {
      closeFile()
        .then(() => {
          setIsGameStarted(false);
        });
        socket.disconnect();
    }
  }, [gameOver, isGameStarted]);

  useEffect(() => {
    if (board.length && !block && !gameOver) {
      const currentBlock = nextBlock;
      const newNBlock = getRandomBlock();

      if(currentBlock && newNBlock){
      // writeFile(`${currentBlock[0][1]} ${newNBlock[0][1]}\n`);
        socket.emit("gameAction", {
          event: `${currentBlock[0][1]} ${newNBlock[0][1]}`,
        });
      }
        newBlock(currentBlock, newNBlock);
    }
  }, [board, block, newBlock, gameOver, nextBlock]);

  const handleFreeze = useCallback(() => {
    freezeBlock();
    socket.emit("gameAction", { event: "mB" });
    //writeFile("mB\n");   
  }, [freezeBlock]);

  useEffect(() => {
    if (isGameStarted && !pause) {
      const intervalId = setInterval(() => {
        if (canMove(board, block, { row: position.row + 1, column: position.column })) {
          moveDown();
          //writeFile("mD\n");
          socket.emit("gameAction", { event: "mD" });
        } else {
         handleFreeze();
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [moveDown, isGameStarted, pause, position, board, block, handleFreeze]);
  
  const handleCloseMenu = () => {
    if (pause) pauseGame();
  };

 const [pressedKeys, setPressedKeys] = useState<{ [key: string]: boolean }>({});

const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isGameStarted || pause || !position) return;

      const key = event.key;
      if (pressedKeys[key]) return;

      setPressedKeys((prevKeys) => ({ ...prevKeys, [key]: true }));

      let actionEvent = "";
      switch (key) {
        case "ArrowLeft":
          if (canMove(board, block, { row: position.row, column: position.column - 1 })) {
            moveLeft();
            actionEvent = "mL";
          }
          break;
        case "ArrowRight":
          if (canMove(board, block, { row: position.row, column: position.column + 1 })) {
            moveRight();
            actionEvent = "mR";
          }
          break;
        case "ArrowUp": {
          const rotated = rotateBlock(block);
          if (canMove(board, rotated, { row: position.row, column: position.column })) {
            rotate();
            actionEvent = "mU";
          }
          break;
        }
        case "ArrowDown":
          if (canMove(board, block, { row: position.row + 1, column: position.column })) {
            moveDown();
            actionEvent = "mD";
          } else {
            handleFreeze();
            actionEvent = "mB";
          }
          break;
        default:
          break;
      }
      if (actionEvent) socket.emit("gameAction", { event: actionEvent });
    },
    [isGameStarted, pause, position, board, block, moveLeft, moveRight, rotate, moveDown, handleFreeze, pressedKeys]
  );

const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
  const key = event.key;
  setPressedKeys((prevKeys) => ({ ...prevKeys, [key]: false }));
}, []);

return (
  <div
    tabIndex={0}
    onKeyDown={handleKeyDown}
    onKeyUp={handleKeyUp}
    className="game"
    autoFocus
  >
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
