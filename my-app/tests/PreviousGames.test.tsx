import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import PreviousGames from '../components/PreviousGames';

describe('PreviousGames Component', () => {
  it('renders the list of saved games and calls onSelectGame when a button is clicked', () => {
    const mockSavedGames = ['game1.txt', 'game2.txt', 'game3.txt'];
    const mockOnSelectGame = vi.fn();

    render(<PreviousGames savedGames={mockSavedGames} onSelectGame={mockOnSelectGame} />);

    expect(screen.getByText('Select a saved game to replay:')).toBeInTheDocument();

    mockSavedGames.forEach((file) => {
      expect(screen.getByText(file)).toBeInTheDocument();
    });

    const firstGameButton = screen.getByText('game1.txt');
    fireEvent.click(firstGameButton);

    expect(mockOnSelectGame).toHaveBeenCalledWith('game1.txt');
    expect(mockOnSelectGame).toHaveBeenCalledTimes(1);
  });

  it('renders an empty list when there are no saved games', () => {
    render(<PreviousGames savedGames={[]} onSelectGame={() => {}} />);

    expect(screen.getByText('Select a saved game to replay:')).toBeInTheDocument();

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
