import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import RestartMenu from "../components/RestartMenu";
import { openFile, closeFile, getGames, readFile } from "../api/file";
import PreviousGames from "../components/PreviousGames";

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
    pauseGame,
    pause
  } = useBoard();

  const [isReplaying, setIsReplaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [savedGames, setSavedGames] = useState<string[]>([]);
  const [moves, setMoves] = useState([]);

  const handleStartGame = () => {
    openFile()
      .then(() => {
        startNewGame();
        setIsGameStarted(true);
      });
  };

  const handleReplayGame = () => {
    getGames()
      .then((files) => {
        setSavedGames(files); 
        setIsReplaying(isReplaying? false : true); 
      })
      .catch((error) => {
        console.error("Error fetching saved games", error);
      });
  };

  const handleSelectedGame = (file:string) =>{
      readFile(file)
      .then(result => { 
        setMoves(result)
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (moves.length > 0) {
        moves.forEach(move => {
          replayMove(move);
        });
      } 
      return () => clearInterval(intervalId);
    }, 500);
  }, [moves]);//??


  useEffect(() => {
    if (gameOver && isGameStarted) {
      closeFile()
        .then(() => {
          setIsGameStarted(false);
        });
    }
  }, [gameOver, isGameStarted]);
  
  

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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isGameStarted) return;//??
      if (pause) return;//??
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
    [moveLeft, moveDown, moveRight, rotate,isGameStarted,pause]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      {!isGameStarted && !isReplaying && (<button onClick={handleStartGame} > Start Game</button>) }
      <button onClick={handleReplayGame} > Replay Game</button>
      <button onClick={pauseGame} > Pause</button>

      {isReplaying && (
        <PreviousGames savedGames={savedGames} onSelectGame={handleSelectedGame}/>
      )}

      <RestartMenu score={score} isOpen={gameOver} onClose={()=>{}} />

      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default App;


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
