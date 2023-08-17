import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NewProduct from "./NewProduct";
import * as hooks from "./components/state/useForm";

describe("NewProduct", () => {
  it("should render new product", () => {
    jest.spyOn(hooks, "useForm").mockImplementation(() => ({
      functions: {},
      values: {},
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <NewProduct />
      </MemoryRouter>
    );

    const elem = screen.getByText(/Formulario de Registro/i);

    expect(elem).toBeInTheDocument();
  });
});
