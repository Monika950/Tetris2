import React from 'react';
import './Square.css';
import {SquareType} from './type';


interface SquareProps
{
    type:SquareType;
}

const Square: React.FC = ({type}) => {
  return (
    <div className="square" />
  );
};

export default Square;
