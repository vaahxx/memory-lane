import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoriesList } from "./memories-list";

const mockMemories = [
  {
    id: 1,
    title: "Memory 1",
    description: "Description 1",
    timestamp: "2023-01-01T12:00:00Z",
    image_url: "/images/memory1.jpg",
    user_id: 1,
  },
  {
    id: 2,
    title: "Memory 2",
    description: "Description 2",
    timestamp: "2023-01-02T12:00:00Z",
    image_url: "/images/memory1.jpg",
    user_id: 1,
  },
];

describe("MemoriesList Component", () => {
  it("renders a message when there are no memories", () => {
    render(<MemoriesList memories={[]} />);

    expect(screen.getByText("You have no memories yet.")).toBeInTheDocument();
    expect(screen.getByText("Create one!")).toBeInTheDocument();
  });

  it("renders memory cards when memories are provided", () => {
    render(<MemoriesList memories={mockMemories} />);

    expect(screen.getByText("Memory 1")).toBeInTheDocument();
    expect(screen.getByText("Memory 2")).toBeInTheDocument();

    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();
    expect(screen.getAllByRole("img")[0]).toMatchSnapshot();
  });
});
