import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import Board from "../components/Board";
import { SquareType, Empty, Block } from "../components/types";

describe("Board Component", () => {
  it("renders with an empty board", () => {
    const board = Array.from({ length: 20 }, () => Array(10).fill(Empty.E));

    render(<Board board={board} block={null} position={null} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(20);

    const squares = screen.getAllByTestId("square");
    expect(squares).toHaveLength(20 * 10);

    squares.forEach((square) => {
      expect(square).toHaveClass("E");
    });
  });

  it("renders with a block on the board", () => {
    const board = Array.from({ length: 20 }, () => Array(10).fill(Empty.E));
    const shape: SquareType[][] = [
      [Empty.E, Block.T, Empty.E],
      [Block.T, Block.T, Block.T],
    ];

    render(<Board board={board} block={shape} position={{ row: 2, column: 3 }} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(20);

    const squares = screen.getAllByTestId("square");
    expect(squares).toHaveLength(20 * 10);

    const blockCoordinates = [
      { row: 2, column: 4 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
    ];

    blockCoordinates.forEach(({ row, column }) => {
      const squareIndex = row * 10 + column;
      expect(squares[squareIndex]).toHaveClass("T"); 
    });

    squares.forEach((square, index) => {
      if (
        !blockCoordinates.some(
          ({ row, column }) => index === row * 10 + column
        )
      ) {
        expect(square).toHaveClass("E");
      }
    });
  });
});
