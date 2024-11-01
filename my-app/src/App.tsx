import "./App.css";
import { useCallback, useState } from "react";
import PlayerGame from "../components/PlayerGame";
import ReplayGame from "../components/ReplayGame";
import { getGames, readFile } from "../api/file";
import PreviousGames from "../components/PreviousGames";


function App() {
   const [isReplaying, setIsReplaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [savedGames, setSavedGames] = useState<string[]>([]);
  const [moves, setMoves] = useState([]);
  
  const handleStartGame = () => {
    
        setIsGameStarted(true);
    
  };

  const handleSelectedGame = useCallback((file:string) =>{
    readFile(file)
    .then(result => { 
      setMoves(result)
    })
    .catch(error => {
      console.error('Error reading file:', error);
    });
    setIsReplaying(false);
},[]);

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
      {!isGameStarted && (
        <>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={handleReplayGame}>Replay Game</button></>
      )}
  
      {isReplaying && (
        <PreviousGames savedGames={savedGames} onSelectGame={handleSelectedGame} />
      )}

      {moves.length > 0 && (
        <ReplayGame moves={moves}/>
      )}
  
      {isGameStarted && (
        <PlayerGame/>
      )}
    </div>
  );
  
}

export default App;

