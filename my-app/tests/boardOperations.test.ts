import { describe, expect, it } from 'vitest';
import { Block, Empty, SquareType } from '../components/types';
import { canClearRow, clearRows, canMove, updateScore } from '../components/boardOperations';

describe('canClearRow', () => {
  it('returns true when all cells in the row are filled', () => {
    const row: SquareType[] = [Block.T, Block.T, Block.T, Block.T]; 
    expect(canClearRow(row)).toBe(true);
  });

  it('returns false when at least one cell is empty', () => {
    const row: SquareType[] = [Block.T, Empty.E, Block.T, Block.T]; 
    expect(canClearRow(row)).toBe(false);
  });
});

describe('clearRows', () => {
    it('clears a single full row and adds score', () => {
        const board: SquareType[][] = [
          [Block.T, Block.T, Block.T, Block.T], 
          [Empty.E, Empty.E, Empty.E, Empty.E],
        ];
      
        const result = clearRows(board, 0);
      
        expect(result.board).toEqual([
          [Empty.E, Empty.E, Empty.E, Empty.E], 
          [Empty.E, Empty.E, Empty.E, Empty.E], 
        ]);
      
        expect(result.score).toBe(20); 
      });

  it('clears multiple rows and adds the correct score', () => {
    const board: SquareType[][] = [
      [Block.T, Block.T, Block.T, Block.T],
      [Block.T, Block.T, Block.T, Block.T],
      [Empty.E, Empty.E, Empty.E, Empty.E],
    ];

    const result = clearRows(board, 0);

    expect(result.board).toHaveLength(3);
    expect(result.score).toBe(50);
  });

  it('does not add score for 0 rows cleared', () => {
    const board: SquareType[][] = [
      [Empty.E, Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E, Empty.E],
    ];

    const result = clearRows(board, 0);

    expect(result.board).toHaveLength(2); 
    expect(result.score).toBe(0); 
  });
});

describe('canMove', () => {
  it('returns false if the block goes out of bounds', () => {
    const board: SquareType[][] = [
      [Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
    ];

    const blockShape: SquareType[][] = [
      [Block.T, Block.T],
    ];

    const position = { row: 1, column: 2 };

    expect(canMove(board, blockShape, position)).toBe(false);
  });

  it('returns false if the block collides with existing blocks', () => {
    const board: SquareType[][] = [
      [Block.T, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
    ];

    const blockShape: SquareType[][] = [
      [Block.T, Block.T],
    ];

    const position = { row: 0, column: 0 };

    expect(canMove(board, blockShape, position)).toBe(false);
  });

  it('returns true if the block can move within bounds and does not collide', () => {
    const board: SquareType[][] = [
      [Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
      [Empty.E, Empty.E, Empty.E],
    ];

    const blockShape: SquareType[][] = [
      [Block.T, Block.T],
    ];

    const position = { row: 1, column: 1 }; 

    expect(canMove(board, blockShape, position)).toBe(true);
  });
});


describe('updateScore', () => {
    it('adds 20 points for clearing 1 row', () => {
      const initialScore = 0;
      const updatedScore = updateScore(1, initialScore);
      expect(updatedScore).toBe(20);
    });
  
    it('adds 50 points for clearing 2 rows', () => {
      const initialScore = 0;
      const updatedScore = updateScore(2, initialScore);
      expect(updatedScore).toBe(50);
    });
  
    it('adds 100 points for clearing 3 rows', () => {
      const initialScore = 0;
      const updatedScore = updateScore(3, initialScore);
      expect(updatedScore).toBe(100);
    });
  
    it('adds 200 points for clearing 4 rows', () => {
      const initialScore = 0;
      const updatedScore = updateScore(4, initialScore);
      expect(updatedScore).toBe(200);
    });
  
    it('does not change the score for 0 rows cleared', () => {
      const initialScore = 10;
      const updatedScore = updateScore(0, initialScore);
      expect(updatedScore).toBe(10);
    });
  
    it('does not change the score for more than 4 rows cleared', () => {
      const initialScore = 100;
      const updatedScore = updateScore(5, initialScore);
      expect(updatedScore).toBe(100);
    });
  
    it('applies the increment correctly when starting with a non-zero score', () => {
      const initialScore = 50;
      const updatedScore = updateScore(2, initialScore);
      expect(updatedScore).toBe(100);
    });
  });