import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest';
import App from '../src/App'; 

describe('App', () => {
  // it('renders PlayerGame component when Start Game is clicked', async () => {
  //   render(<App />);
  //   fireEvent.click(screen.getByText(/Start Game/i));
  
  //   screen.debug();  
  
  //   const tetrisText = await screen.findByText(/Tetris/i);
  //   expect(tetrisText).toBeInTheDocument();
  // });

  // it('renders PlayerGame component when Start Game is clicked', () => {
  //   render(<App />);

  //   fireEvent.click(screen.getByText(/Start Game/i));

  //   const tetrisText = await screen.findByText(/TETRIS/i);
  //   expect(tetrisText).toBeInTheDocument();
  // });

  it('renders ReplayGame component when Replay Game is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Replay Game/i));

    expect(screen.getByText(/Replay/i)).toBeInTheDocument();
  });
});
