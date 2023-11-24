import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant styles", () => {
    render(<Button variant='transparent'>Transparent</Button>);

    const buttonElement = screen.getByText("Transparent").closest("button");
    expect(buttonElement).toHaveClass("flex");
    expect(buttonElement).toHaveClass("transition-all");
  });
});
