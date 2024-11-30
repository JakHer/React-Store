import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App Component", () => {
  test("full app rendering/navigating", async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test("rendering a component that uses useLocation", () => {
    const storeRoute = "/store";

    render(
      <MemoryRouter initialEntries={[storeRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Store Page/i)).toBeInTheDocument();
  });
});
