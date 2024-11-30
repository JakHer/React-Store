import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header";

describe("App Component", () => {
  test("Renders Header", () => {
    render(<Header />);

    const welcomeMessage = screen.getByText(/Welcome to Your React Store/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
