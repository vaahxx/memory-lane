import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Modal } from "./modal";

describe("Modal Component", () => {
  it("renders the Modal component with trigger button", () => {
    render(
      <Modal open onModalStateChange={() => {}}>
        <div data-testid='modal-content'>Modal Content</div>
      </Modal>
    );

    expect(screen.getByTestId("modal-content")).toMatchSnapshot();
  });

  it("opens the modal when the trigger button is clicked", async () => {
    const onModalStateChangeMock = jest.fn();
    render(
      <Modal open onModalStateChange={onModalStateChangeMock}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onModalStateChangeMock).toHaveBeenCalled();
    });
  });

  it("closes the modal when clicking outside the modal content", async () => {
    const onModalStateChangeMock = jest.fn();
    const { container } = render(
      <Modal open onModalStateChange={onModalStateChangeMock}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(container.firstChild!);

    await waitFor(() => {
      expect(onModalStateChangeMock).toHaveBeenCalledWith(false);
    });
  });
});
