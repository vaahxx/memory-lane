import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Dropdown } from "./dropdown";

const options = [
  { key: "option1", value: "Option 1" },
  { key: "option2", value: "Option 2" },
  { key: "option3", value: "Option 3" },
];

describe("Dropdown Component", () => {
  it("renders the dropdown button with the default selected option", () => {
    render(<Dropdown options={options} onSelect={() => {}} />);

    expect(screen.findAllByLabelText("Option 1")).toMatchSnapshot();
  });

  it("opens the dropdown on button click", async () => {
    render(<Dropdown options={options} onSelect={() => {}} />);

    fireEvent.click(screen.getByTestId("dropdown-button"));

    await waitFor(() => {
      expect(screen.getByTestId(options[0].key)).toBeInTheDocument();
    });
  });

  it("selects an option and calls the onSelect function", async () => {
    const onSelectMock = jest.fn();
    render(<Dropdown options={options} onSelect={onSelectMock} />);

    fireEvent.click(screen.getByTestId("dropdown-button"));

    await waitFor(() => {
      expect(screen.getByTestId(options[0].key)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId(options[0].key));

    expect(onSelectMock).toHaveBeenCalledWith(options[0].key);
  });
});
