import "./App.css";
import { useCallback, useState } from "react";
import PlayerGame from "../components/PlayerGame";
import { openFile, closeFile, getGames, readFile } from "../api/file";
import PreviousGames from "../components/PreviousGames";


function App() {
   const [isReplaying, setIsReplaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [savedGames, setSavedGames] = useState<string[]>([]);
  
  const handleStartGame = () => {
    
        setIsGameStarted(true);
    
  };

  const handleSelectedGame = () => {
    setIsReplaying(true);
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
