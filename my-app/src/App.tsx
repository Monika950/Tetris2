import './App.css'
import { useEffect } from 'react';
import Board from '../components/Board'
import useBoard from '../hooks/useBoard'
import { Block } from '../components/type';
 

function App() {

  const { board, startGame, placeBlock, moveDown } = useBoard();

  useEffect(() => {
    startGame();
    placeBlock({ row: 4, column: 0 }, Block.L); 
  }, [board]);


  return (
    <>
      <Board board={board}/>
      
    </>
  )
}

export default App
