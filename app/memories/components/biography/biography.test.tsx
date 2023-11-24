import { fireEvent, render, screen } from "@testing-library/react";
import { Biography } from "./biography";
import { useFormStatus } from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: jest.fn().mockReturnValue([{}, jest.fn()]),
  useFormStatus: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({
    id: "123",
  }),
}));

describe("Biography", () => {
  const text = "Hello, world!";
  it("renders the text", () => {
    const { container } = render(<Biography text={text} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders the button", () => {
    const { container } = render(<Biography text={text} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("if is editing, then biography form is rendered", () => {
    render(<Biography text={text} />);

    // Mock the return value of the useFormStatus hook
    (useFormStatus as jest.Mock).mockReturnValue({
      pending: false,
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("biography-form")).toMatchSnapshot();
  });
});
