import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
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
  } = useBoard();

  const [isReplaying, setIsReplaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [savedGames, setSavedGames] = useState<string[]>([]);

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
      readFile(file).then (result => console.log(result));
  };

  useEffect(() => {
    if (gameOver && isGameStarted) {
      closeFile()
        .then(() => {
          setIsGameStarted(false);
        });
    }
  }, [gameOver, isGameStarted]);

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


  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isGameStarted) return;
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
    [moveLeft, moveDown, moveRight, rotate,isGameStarted]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <button onClick={handleStartGame} > Start Game</button>
      <button onClick={handleReplayGame} > Replay Game</button>

      {isReplaying && (
        <PreviousGames savedGames={savedGames} onSelectGame={handleSelectedGame}/>
      )}

      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default App;

// до сега последната главна задача беше форматирането във файла за да можеш след това да направиш реплей
// нека до бутона за начало да има и бутон за реплей. като го цъкнеш ще се вземе списък на сейвнатите файлове от бекенда, ще се покаже на юзъра, той ще си избере един и ще започне реплей на тази сесия. тъй като във файла имаш един дълъг списък от действия нека да се реплейват едно по едно през 0.5 секунди докато играта свърши