import React from 'react';
import './Square.css';
import {SquareType} from './types';

interface SquareProps
{
    type:SquareType;
}

const Square: React.FC<SquareProps> = ({type}) => {
  return (
    <div data-testid="square"  className={`square ${type}`} />
  );
};

export default Square;