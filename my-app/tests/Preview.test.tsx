import React from 'react';
import { render, screen} from '@testing-library/react';
import {describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Preview from '../components/Preview';
import { SquareType, Empty, Block } from '../components/types';

describe("Preview Component", () => {
  
  it("renders with a shape prop", () => {
    const shape: SquareType[][] = [
      [Empty.E, Block.T, Empty.E],
      [Block.T, Block.T, Block.T],
    ];

    render(<Preview shape={shape} />);

    expect(screen.getByText('Next Block')).toBeInTheDocument();

    const board = screen.getByLabelText('next-block-board');
    expect(board).toBeInTheDocument();

    const rows = screen.getAllByTestId('square');
    expect(rows).toHaveLength(6); 
  });
});
