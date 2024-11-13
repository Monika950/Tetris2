import React,{ useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { BlockShapes } from "./blockOperations.ts";

interface ReplayingProps {
    moves: string[];
  }
  
  const Replaying: React.FC<ReplayingProps> = ({ moves }) => {
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
    freezeBlock
  } = useBoard();

  const [isReplaying, setIsReplaying] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  useEffect(() => {
    const initializeReplay = async () => {
      await startNewGame();
      setIsReplaying(true);
      setCurrentMoveIndex(0);
    };

    if (moves.length > 0 && !isReplaying) initializeReplay();
  }, [startNewGame, moves, isReplaying]);

  const replayMove = useCallback(
    (move: string) => {

      if (move.includes(" ")) {
        const [blockStr1, blockStr2] = move.split(" ");
        newBlock(BlockShapes[blockStr1], BlockShapes[blockStr2]);
        
      } else {
        switch (move) {
          case "mL":
            moveLeft();
            break;
          case "mR":
            moveRight();
            break;
          case "mU":
            rotate();
            break;
          case "mD":
            moveDown();
            break;
          case "mB":
            freezeBlock();
            break;
          default:
            break;
        }
      }
    },
    [newBlock, moveLeft, moveRight, rotate, moveDown, freezeBlock]
  );

  useEffect(() => {
    if (isReplaying && currentMoveIndex >= moves.length) {
      setIsReplaying(false);
      return;
    }

    const intervalId = setInterval(() => {
      const move = moves[currentMoveIndex];
      replayMove(move);
      setCurrentMoveIndex((prevIndex) => prevIndex + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isReplaying, currentMoveIndex, moves, replayMove]);

  return (
    <div tabIndex={0} className="game">
      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default Replaying;
