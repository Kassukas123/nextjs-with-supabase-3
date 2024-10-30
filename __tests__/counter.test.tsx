import Counter from "../components/counter/counter";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Counter", () => {
  it("näitab algväärtust", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("suurendab väärtust klõpsamisel", () => {
    render(<Counter />);
    const increaseButton = screen.getByText("Increase");
    fireEvent.click(increaseButton);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("vähendab väärtust klõpsamisel", () => {
    render(<Counter />);
    const decreaseButton = screen.getByText("Decrease");
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });
});
