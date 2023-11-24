import React from "react";
import { render, screen } from "@testing-library/react";
import { Title } from "./title";

describe("Title Component", () => {
  it("renders the Title component with the provided text", () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the Title component with the correct styles", () => {
    render(<Title>Test Title</Title>);
    const titleElement = screen.getByText("Test Title");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-5xl");
    expect(titleElement).toHaveClass("mb-10");
    expect(titleElement).toHaveClass("antialiased");
  });
});
