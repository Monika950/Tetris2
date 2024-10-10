import './App.css'
import { useEffect } from 'react';
import Board from '../components/Board'
import useBoard from '../hooks/useBoard'
 

function App() {

  const { board, startGame, newBlock, moveDown, moveLeft} = useBoard();

  useEffect(() => {
    startGame();
    newBlock(); 
  }, []);

  function handleKeyDown(event:React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowLeft':
        moveLeft(); 
        break;
      // case 'ArrowRight':
      //   moveRight(); 
      //   break;
      // case 'ArrowUp':
      //   rotateBlock(); 
      //   break;
      case 'ArrowDown':
        moveDown(); 
        break;
      default:
        break;
    }
  }


  return (
    <div
    tabIndex={0} 
    onKeyDown={handleKeyDown} 
    style={{ outline: 'none' }} 
  >
    <Board board={board} />
  </div>
  )
}

export default App
