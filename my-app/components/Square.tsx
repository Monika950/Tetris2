import React from 'react';
import './Square.css';
import {SquareType} from './type';


interface SquareProps
{
    type:SquareType;
}

const Square: React.FC<SquareProps> = ({type}) => {
  return (
    <div className={`square ${type}`} />
  );
};

export default Square;
