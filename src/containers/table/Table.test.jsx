import { render, screen, act } from "@testing-library/react";
import Table from "./Table";
import { MemoryRouter } from "react-router-dom";

describe("Table", () => {
  it("should Table render elements", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => ({
      status: 200,
      json: () =>
        Promise.resolve([
          { id: "p1", name: "Producto 1" },
          { id: "p2", name: "Producto 2" },
        ]),
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Table />
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    const products = screen.getAllByText(/Producto/);

    expect(products.length).toBe(2);
  });
});
