import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { openFile, writeFile, closeFile, getGames } from "../api/file";

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
      .then(() => writeFile('start\n'))
      .then(() => {
        startNewGame();
        setIsGameStarted(true);
      });
  };

  const handleReplayGame = () => {
    getGames()
      .then((files) => {
        setSavedGames(files); 
        setIsReplaying(true); 
      })
      .catch((error) => {
        console.error("Error fetching saved games", error);
      });
  };

  useEffect(() => {
    if (gameOver && isGameStarted) {
      writeFile(`game over\n`)
        .then(() => closeFile())
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
      <Button name="start" onClick={handleStartGame} />
      <Button name="replay" onClick={handleReplayGame} />

      {isReplaying && (
        <div>
          <h3>Select a saved game to replay:</h3>
          <ul>
            {savedGames.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      <Board board={board} block={block} position={position} />
      <ScoreBoard score={score} />
      <Preview shape={nextBlock} />
    </div>
  );
}

export default App;


// все още не съм поискал бутон за начало, но няма лошо да сложиш един
// до сега последната главна задача беше форматирането във файла за да можеш след това да направиш реплей
// нека до бутона за начало да има и бутон за реплей. като го цъкнеш ще се вземе списък на сейвнатите файлове от бекенда, ще се покаже на юзъра, той ще си избере един и ще започне реплей на тази сесия. тъй като във файла имаш един дълъг списък от действия нека да се реплейват едно по едно през 0.5 секунди докато играта свърши