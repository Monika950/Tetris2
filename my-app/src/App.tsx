import './App.css'
import { useEffect } from 'react';
import Board from '../components/Board'
import useBoard from '../hooks/useBoard'
import { getRandomBlock} from '../components/Blocks';
 

function App() {

  const { board, startGame, newBlock, moveDown } = useBoard();

  useEffect(() => {
    startGame();
    newBlock({ row: 4, column: 0 }, getRandomBlock()); 
  }, []);

  function handleKeyDown(event:React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      // case 'ArrowLeft':
      //   moveLeft(); 
      //   break;
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
