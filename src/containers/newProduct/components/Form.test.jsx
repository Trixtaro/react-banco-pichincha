import { render } from "@testing-library/react";
import Form from "./Form";
import * as hooks from "./state/useForm";

jest.mock("./state/useForm");

describe("Form", () => {
  it("should render form", () => {
    hooks.useForm.mockImplementation(() => ({ functions: {}, values: {} }));
    render(<Form />);
  });
});
