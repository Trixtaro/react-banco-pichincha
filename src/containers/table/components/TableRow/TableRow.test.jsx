import React from "react";

import { act, fireEvent, render, screen } from "@testing-library/react";
import TableRow from "./TableRow";
import { MemoryRouter } from "react-router-dom";

describe("TableRow", () => {
  it("should not render options when the three dots have not been clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TableRow id={"an id"} />
      </MemoryRouter>
    );

    const dots = screen.getByAltText("options");

    fireEvent.click(dots);

    const editOption = screen.getByText(/Editar/);

    expect(editOption).toBeInTheDocument();
  });
});
