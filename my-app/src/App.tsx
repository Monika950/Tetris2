import "./App.css";
import { useCallback, useEffect } from "react";
import Button from "../components/Button";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Preview from "../components/Preview";
import useBoard from "../hooks/useBoard";
import { openFile, writeFile, closeFile } from "../api/file";

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

  useEffect(() => {
    if(board.length) return

    openFile()
      .then(() => {
        return writeFile('start');
      }).then(() => {
        startNewGame();
      })
  }, [startNewGame, board.length]);

  useEffect(() => {
    if(gameOver){
      writeFile(`game over\n`).then(() => {
        return closeFile();
      }).then(() => {
        return openFile()
      }).then(() => {
        return writeFile('start');
      }).then(() => {
        startNewGame();
      })
    }
}, [gameOver, startNewGame]);


  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
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
    [moveLeft, moveDown, moveRight, rotate]
  );

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="game">
      <Button name={'start'}/>
      <Button name={'replay'}/>
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