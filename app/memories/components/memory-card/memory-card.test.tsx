import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryCard } from "./memory-card";

const mockMemory = {
  title: "Test Memory",
  content: "Test Content",
  date: "2023-01-01T12:00:00Z",
  image: "/images/test-image.jpg",
};

describe("MemoryCard Component", () => {
  it("renders the MemoryCard component with the provided details", () => {
    render(
      <MemoryCard
        title={mockMemory.title}
        content={mockMemory.content}
        date={mockMemory.date}
        image={mockMemory.image}
      />
    );

    expect(screen.getByText("Test Memory")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();
    expect(screen.getByAltText("Memory")).toMatchSnapshot;
  });
});
