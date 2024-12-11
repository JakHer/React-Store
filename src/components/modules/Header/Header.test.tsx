import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../../pages/Home/Home';
import { Store } from '../../../pages/Store/Store';
import { Header } from './Header';

const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/store"
          element={<Store />}
        />
      </Routes>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('Renders the Home link and navigates correctly', () => {
    renderHeader();

    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent('Home');

    fireEvent.click(homeLink);

    expect(screen.getByTestId('welcome-heading')).toBeInTheDocument();
  });

  test('Renders the Store link and navigates correctly', () => {
    renderHeader();

    const storeLink = screen.getByTestId('store-link');
    expect(storeLink).toBeInTheDocument();
    expect(storeLink).toHaveTextContent('Store');

    fireEvent.click(storeLink);

    expect(screen.getByTestId('products-container')).toBeInTheDocument();
  });

  test('Mobile menu opens and closes correctly when the hamburger icon is clicked', async () => {
    renderHeader();

    const mobileMenu = screen.queryByTestId('mobile-menu');
    expect(mobileMenu).toBeNull();

    const hamburgerIcon = screen.getByTestId('hamburger-icon');
    fireEvent.click(hamburgerIcon);

    const mobileMenuOpened = screen.getByTestId('mobile-home-link');
    expect(mobileMenuOpened).toBeInTheDocument();

    fireEvent.click(hamburgerIcon);

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-home-link')).toBeNull();
    });
  });

  test('Menu closes when a link is clicked (on mobile)', async () => {
    renderHeader();

    const hamburgerIcon = screen.getByTestId('hamburger-icon');
    fireEvent.click(hamburgerIcon);

    const mobileMenuOpened = screen.getByTestId('mobile-home-link');
    expect(mobileMenuOpened).toBeInTheDocument();

    fireEvent.click(mobileMenuOpened);

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-home-link')).toBeNull();
    });

    expect(screen.getByTestId('welcome-heading')).toBeInTheDocument();
  });

  test('Header has appropriate classes', async () => {
    renderHeader();

    await waitFor(() => {
      const headerElement = screen.getByTestId('header');
      expect(headerElement).toHaveClass(
        'w-full bg-white border-b border-gray-300 shadow-sm relative'
      );
    });
  });
});
