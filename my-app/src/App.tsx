import "./App.css";
import {useState} from "react";
import PlayerGame from "../components/PlayerGame/PlayerGame";
import ReplayGame from "../components/Replay/ReplayGame";


function App() {
  const [isReplaying, setIsReplaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
 
  return (
    <div tabIndex={0}>
      {!isGameStarted && !isReplaying && (
        <>
        <button onClick={()=>setIsGameStarted(true)}>Start Game</button>
        <button onClick={()=>setIsReplaying(true)}>Replay Game</button></>
      )}

      {isReplaying && (
        <ReplayGame/>
      )}
  
      {isGameStarted && (
        <PlayerGame/>
      )}
    </div>
  );
  
}

export default App;

