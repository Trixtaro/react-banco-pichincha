import {
  render,
  screen,
  act,
  fireEvent,
  getByText,
} from "@testing-library/react";
import Input from "./Input";
import { useState } from "react";

describe("Input", () => {
  it("should render correctly", () => {
    render(<Input name="test" value="test" />);

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  const InputWrapper = ({ ...props }) => {
    const [value, setValue] = useState("");

    return (
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  };

  it("should change its value when user types", () => {
    render(<InputWrapper name={"name"} />);

    const input = screen.getByRole("textbox");

    expect(input.value).toBe("");

    fireEvent.change(input, {
      target: {
        value: "W",
      },
    });

    expect(input.value).toBe("W");
  });

  it("should change values with default props", () => {
    render(
      <Input
        validationMessage="A validation message"
        pattern={"[a-zA-Z]{1,}"}
        forceValid={false}
      />
    );

    const input = screen.getByRole("textbox");

    expect(input.value).toBe("");

    fireEvent.change(input, {
      target: {
        value: "W",
      },
    });

    expect(screen.getByText(/A validation message/i)).toBeInTheDocument();
  });
});
