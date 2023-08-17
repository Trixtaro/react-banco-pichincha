import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);

    const imgElement = screen.getByAltText("Banco Pichincha");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveStyle({
      width: "200px",
    });
  });
});
