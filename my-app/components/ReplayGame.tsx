import { useCallback, useEffect, useState } from "react";

import useBoard from "../hooks/useBoard";
import RestartMenu from "../components/RestartMenu";
import { openFile, closeFile, getGames, readFile } from "../api/file";
import PreviousGames from "../components/PreviousGames";
import { getRandomBlock } from "../components/Blocks";

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
      const [isGameStarted, setIsGameStarted] = useState(false);
      const [currentMoveIndex, setCurrentMoveIndex] = useState(0);


  const handleSelectedGame = useCallback((file:string) =>{
      readFile(file)
      .then(result => { 
        setMoves(result)
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  },[]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    startNewGame();
  };

  useEffect(() => {
    if (!isReplaying || currentMoveIndex >= moves.length) {
      setIsReplaying(false);
      return;
    }

    const intervalId = setInterval(() => {
      replayMove(moves[currentMoveIndex]);
      setCurrentMoveIndex((prevIndex) => prevIndex + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isReplaying, currentMoveIndex, moves]);

  useEffect(() => {
    if (board.length && !block && !position) {
      newBlock(getRandomBlock(), getRandomBlock());
    }
  }, [board, block, position, newBlock,]);

 const replayMove = (move:string) =>
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

 }

 
  return (
    <div tabIndex={0}>
      {!isGameStarted && !isReplaying && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
      <button onClick={handleReplayGame}>Replay Game</button>
      
  
      {isReplaying && (
        <PreviousGames savedGames={savedGames} onSelectGame={handleSelectedGame} />
      )}
  
      {isGameStarted && (
        <PlayerGame/>
      )}
    </div>
  );
  
}

export default ReplayGame;


// useEffect(() => {
//   if(board.length) return
//   openFile()
//     .then(() => {
//       return writeFile('start');
//     }).then(() => {
//       startNewGame();
//     })
// }, [startNewGame, board.length]);
  
  //   useEffect(() => {
  //     if(gameOver){
  //       writeFile(`game over\n`).then(() => {
  //         return closeFile();
  //       }).then(() => {
  //         return openFile()
  //       }).then(() => {
  //         return writeFile('start');
  //       }).then(() => {
  //         startNewGame();
  //       })
  //     }
  // }, [gameOver, startNewGame]);
