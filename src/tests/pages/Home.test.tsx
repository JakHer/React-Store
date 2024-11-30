import { render, screen } from "@testing-library/react";
import { Home } from "../../pages/Home";

describe("App Component", () => {
  test("Renders Header", () => {
    render(<Home />);

    const welcomeMessage = screen.getByText(/Home Page/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
