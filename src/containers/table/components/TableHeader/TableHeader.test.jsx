import { render, screen } from "@testing-library/react";

import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  it("should render TableHeader", () => {
    render(<TableHeader />);

    const column = screen.getByText(/Nombre de productos/i);

    expect(column).toBeInTheDocument();
  });
});
