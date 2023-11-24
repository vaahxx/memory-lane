import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Heading } from "./heading";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("Heading Component", () => {
  it("renders the title", () => {
    render(<Heading title='Test Title' />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("triggers the handleShare function on button click", async () => {
    render(<Heading title='Test Title' />);
    fireEvent.click(screen.getByText("Share"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        window.location.href
      );
    });
  });
});
