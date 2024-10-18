import React from 'react';
import { SquareType } from './types';

interface ScoreBoardProps {
  shape: SquareType[][];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ shape}) => {
  return (
    <div className="score-board">
      
    </div>
  );
}

export default ScoreBoard;
