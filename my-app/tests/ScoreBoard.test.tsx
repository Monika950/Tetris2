import React from "react";
import { render, screen } from "@testing-library/react";
import ScoreBoard from "../components/ScoreBoard";
import { describe, it, expect } from "vitest";

describe("ScoreBoard", () => {
    it("renders correctly with score 20", () => {
        render(<ScoreBoard score={20} />);

        const scoreBoard = screen.getByRole("heading", { name: /Score : 20/i });
        expect(scoreBoard).toBeInTheDocument();
        expect(scoreBoard).toHaveTextContent("Score : 20");
    });
});
