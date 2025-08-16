import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreIndicator } from "./score-indicator";
import { getScoreIndicatorClasses } from "./utils";

// Mock the utils function
vi.mock("./utils", () => ({
  getScoreIndicatorClasses: vi.fn(),
}));

describe("ScoreIndicator", () => {
  it("should render score value", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-green-500",
      width: 85,
    });

    render(<ScoreIndicator score={85} />);

    expect(screen.getByText("85")).toBeInTheDocument();
  });

  it("should call getScoreIndicatorClasses with correct score", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-blue-500",
      width: 70,
    });

    render(<ScoreIndicator score={70} />);

    expect(getScoreIndicatorClasses).toHaveBeenCalledWith(70);
  });

  it("should apply correct width style to score bar", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-yellow-500",
      width: 45,
    });

    render(<ScoreIndicator score={45} />);

    const scoreBar = document.querySelector(".score-bar");
    expect(scoreBar).toHaveStyle({ width: "45%" });
  });

  it("should apply correct CSS class to score bar", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-red-500",
      width: 25,
    });

    render(<ScoreIndicator score={25} />);

    const scoreBar = document.querySelector(".score-bar");
    expect(scoreBar).toHaveClass("score-bar", "bg-red-500");
  });

  it("should handle zero score", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-gray-300",
      width: 0,
    });

    render(<ScoreIndicator score={0} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(getScoreIndicatorClasses).toHaveBeenCalledWith(0);

    const scoreBar = document.querySelector(".score-bar");
    expect(scoreBar).toHaveStyle({ width: "0%" });
  });

  it("should handle maximum score", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-green-600",
      width: 100,
    });

    render(<ScoreIndicator score={100} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(getScoreIndicatorClasses).toHaveBeenCalledWith(100);

    const scoreBar = document.querySelector(".score-bar");
    expect(scoreBar).toHaveStyle({ width: "100%" });
  });

  it("should render with correct structure", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-blue-500",
      width: 60,
    });

    const { container } = render(<ScoreIndicator score={60} />);

    // Check main container
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass("flex", "items-center", "gap-2");

    // Check progress bar container
    const progressContainer = container.querySelector(".w-16");
    expect(progressContainer).toHaveClass("w-16", "bg-muted", "rounded-full", "h-1.5");

    // Check score text
    const scoreText = container.querySelector(".text-sm");
    expect(scoreText).toHaveClass("text-sm", "font-medium", "text-foreground");
  });

  it("should handle decimal scores", () => {
    vi.mocked(getScoreIndicatorClasses).mockReturnValue({
      scoreClass: "bg-orange-500",
      width: 67.5,
    });

    render(<ScoreIndicator score={67.5} />);

    expect(screen.getByText("67.5")).toBeInTheDocument();
    expect(getScoreIndicatorClasses).toHaveBeenCalledWith(67.5);

    const scoreBar = document.querySelector(".score-bar");
    expect(scoreBar).toHaveStyle({ width: "67.5%" });
  });
});
