// Square.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Square from "../components/Square";
import { Empty, Block } from "../components/types";

describe("Square Component", () => {
  it("renders correctly with an Empty type", () => {
    render(<Square type={Empty.E} />);
    
    const squareElement = screen.getByTestId("square");
    expect(squareElement).toBeInTheDocument();
    expect(squareElement).toHaveClass('square E');
  });

  it("renders correctly with a Block type", () => {
    render(<Square type={Block.T} />);

    const squareElement = screen.getByTestId("square");
    expect(squareElement).toBeInTheDocument();
    expect(squareElement).toHaveClass('square T');
  });
});
