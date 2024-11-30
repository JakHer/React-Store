import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

const renderApp = () => {
  render(
    <Router>
      <App />
    </Router>
  );
};

describe("App Component", () => {
  test("Navigates to Store page when clicking 'Store' link", async () => {
    renderApp();

    const storeLink = screen.getByTestId("store-link");

    fireEvent.click(storeLink);
    expect(screen.getByTestId("store-container")).toBeInTheDocument();
  });

  test("Navigates to Home page when clicking 'Home' link", async () => {
    renderApp();

    const homeLink = screen.getByTestId("home-link");

    fireEvent.click(homeLink);

    expect(screen.getByTestId("home-container")).toBeInTheDocument();
  });

  test("Renders the Header component", () => {
    renderApp();

    const appContainer = screen.getByTestId("app-container");
    expect(appContainer).toBeInTheDocument();

    const pageTransition = screen.getByTestId("page-transition");
    expect(pageTransition).toBeInTheDocument();
  });
});
