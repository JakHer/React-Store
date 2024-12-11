import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { act } from 'react';

const renderApp = () => {
  render(
    <Router>
      <App />
    </Router>
  );
};

describe('App Component', () => {
  test('renders the Header component', () => {
    renderApp();
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Footer component', () => {
    renderApp();
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('renders the CartIcon component on routes except "/cart"', () => {
    renderApp();

    const cartIcon = screen.getByTestId('cart-icon-container');
    expect(cartIcon).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cart-link'));
    expect(screen.queryByTestId('cart-icon')).not.toBeInTheDocument();
  });

  test('renders Home page when clicking on the Home link', async () => {
    renderApp();

    const homeLink = screen.getByTestId('home-link');
    fireEvent.click(homeLink);

    const homeContainer = screen.getByTestId('home-container');
    expect(homeContainer).toBeInTheDocument();
  });

  test('renders Store page when clicking on the Store link', async () => {
    renderApp();

    const storeLink = screen.getByTestId('store-link');
    fireEvent.click(storeLink);

    const storeContainer = screen.getByTestId('products-container');
    expect(storeContainer).toBeInTheDocument();
  });

  test('renders Cart page when clicking on the Cart link', async () => {
    renderApp();

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const cartContainer = screen.getByTestId('cart-container');
    expect(cartContainer).toBeInTheDocument();
  });

  test('renders NotFound page for invalid routes', async () => {
    renderApp();

    // Navigate to an invalid route
    // Wrap history pushState and popstate dispatch in act() to avoid the warning
    await act(async () => {
      // Navigate to an invalid route
      window.history.pushState({}, 'Test page', '/non-existent-route');

      // Dispatch the popstate event to notify React Router of the URL change
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Wait for the NotFound page to render
    await waitFor(() => {
      const notFoundContainer = screen.getByTestId('not-found-container');
      expect(notFoundContainer).toBeInTheDocument();
    });
  });

  test('renders page transition effect when changing routes', async () => {
    renderApp();

    const pageTransition = screen.getByTestId('page-transition');
    expect(pageTransition).toBeInTheDocument();

    const storeLink = screen.getByTestId('store-link');
    fireEvent.click(storeLink);

    const updatedPageTransition = screen.getByTestId('page-transition');
    expect(updatedPageTransition).toBeInTheDocument();
  });
});
