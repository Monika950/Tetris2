import React from 'react';

interface PreviousGamesProps {
  savedGames: string[];
  onSelectGame: (file: string) => void; 
}

const PreviousGames: React.FC<PreviousGamesProps> = ({ savedGames, onSelectGame }) => {
  return (
    <div>
      <h3>Select a saved game to replay:</h3>
      <ul>
        {savedGames.map((file, index) => (
          <li key={index}>
            <button onClick={() => {onSelectGame(file)}} >{file}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousGames;
