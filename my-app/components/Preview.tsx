import React from 'react';
import { SquareType } from './types';
import Square from './Square';

interface PreviewProps {
  shape?: SquareType[][]; 
}

const Preview: React.FC<PreviewProps> = ({ shape }) => {
  return (
    <div className="preview-container">
      <h2>Next Block</h2>
      <div className="board">
        {shape && shape.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row && row.map((square, colIndex) => (
              <Square key={`${rowIndex}-${colIndex}`} type={square} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
