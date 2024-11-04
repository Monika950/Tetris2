import React, { useCallback, useEffect, useState } from 'react';
import PreviousGames from '../components/PreviousGames';
import Replaying from '../components/Replaying';
import { getGames, readFile } from '../api/file';

function ReplayGame() {
  const [savedGames, setSavedGames] = useState<string[]>([]);
  const [moves, setMoves] = useState<string[]>([]);
  const [isReplaying, setIsReplaying] = useState(false);

  useEffect(() => {
    getGames()
      .then((files) => setSavedGames(files))
      .catch((error) => console.error('Error fetching saved games:', error));
  }, []);

  const handleSelectedGame = useCallback((file: string) => {
    readFile(file)
      .then((result) => {
        setMoves(result);
        setIsReplaying(true);
      })
      .catch((error) => console.error('Error reading file:', error));
  }, []);

  return (
    <div tabIndex={0} className="game">
      {!isReplaying ? (
        <PreviousGames savedGames={savedGames} onSelectGame={handleSelectedGame} />
      ) : (
        <Replaying moves={moves} />
      )}
    </div>
  );
}

export default ReplayGame;
