import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { getRandomBlock } from "./Blocks";

interface ReplayProps{
    moves: string[];
}

function ReplayGame({moves}: ReplayProps) {
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

      const [isReplaying, setIsReplaying] = useState(false);
      const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

      useEffect(() => {
        const initializeReplay = async () => {
          await startNewGame();
          console.log(moves[currentMoveIndex]);//I I
          newBlock(, getRandomBlock());
          setIsReplaying(true);
          setCurrentMoveIndex(0);
        };
        
        if (moves.length > 0 && !isReplaying) initializeReplay();
      }, [startNewGame, newBlock, moves, isReplaying, currentMoveIndex]);

    //   useEffect(() => {
    //     if (!isReplaying || currentMoveIndex >= moves.length) {
    //       setIsReplaying(false);
    //       return;
    //     }
    
    //     const intervalId = setInterval(() => {
    //       const move = moves[currentMoveIndex];
          
    //       if (move.includes(" ")) {
    //         const [block1, block2] = move.split(" ");

    //         newBlock(block1, block2);
    //       } else {
    //         // Otherwise, handle it as a single move command
    //         replayMove(move);
    //       }
    
    //       setCurrentMoveIndex((prevIndex) => prevIndex + 1);
    //     }, 500);
    
    //     return () => clearInterval(intervalId);
    //   }, [isReplaying, currentMoveIndex, moves, replayMove, newBlock]);
    


 const replayMove = useCallback( (move:string) =>
 {
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
      moveDown()
      break;
    case "mB":

      break;
    default:
      break;
  }

 },[moveDown, moveRight, moveLeft, rotate]);

 useEffect(() => {
    if (!isReplaying || currentMoveIndex >= moves.length) {
      setIsReplaying(false);
      return;
    }

    const intervalId = setInterval(() => {
      replayMove(moves[currentMoveIndex]);
      console.log(moves[currentMoveIndex])
      setCurrentMoveIndex((prevIndex) => prevIndex + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isReplaying, currentMoveIndex, moves,replayMove]);

 
  return (
    <div tabIndex={0} >
      <Board board={board} block={block} position={position} />
          <ScoreBoard score={score} />
          <Preview shape={nextBlock} />
    </div>
  );
  
}

export default ReplayGame;

