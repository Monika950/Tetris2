import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { BlockShapes } from "./Blocks";
import { Block } from "../components/types";

interface ReplayProps {
  moves: string[];
}

function ReplayGame({ moves }: ReplayProps) {
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
  } = useBoard();

  const [isReplaying, setIsReplaying] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  function toBlockType(blockStr: string): Block | null {
    return BlockShapes[blockStr] || null;
  }

  useEffect(() => {
    const initializeReplay = async () => {
      await startNewGame();
      setIsReplaying(true);
      setCurrentMoveIndex(0);
    };
console.log(moves.length, isReplaying)
    if (moves.length > 0 && !isReplaying) initializeReplay();
  }, [startNewGame, moves, isReplaying]);

  const replayMove = useCallback(
    (move: string) => {
        console.log(move)
      if (move.includes(" ")) {
        const [blockStr1, blockStr2] = move.split(" ");
        // const block1 = toBlockType(blockStr1);
        // const block2 = toBlockType(blockStr2);
        // if (block1 && block2) {
          newBlock(blockStr1, blockStr2);
        // }
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
            moveDown();
            break;
          default:
            break;
        }
      }
    },
    [moveLeft, moveRight, rotate, moveDown, newBlock]
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

  // Add debug logs here to verify values
  console.log("Current Score:", score);
  console.log("Next Block Shape:", board, block, nextBlock);

  return (
    <div tabIndex={0} className="game">
      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default ReplayGame;
