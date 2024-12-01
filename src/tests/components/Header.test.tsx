import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Store } from '../../pages/Store';
import { Header } from '../../components/Header';

const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
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

    // Initially, ensure the mobile menu is not visible
    const mobileMenu = screen.queryByTestId('mobile-menu');
    expect(mobileMenu).toBeNull();

    // Click the hamburger icon to open the mobile menu
    const hamburgerIcon = screen.getByTestId('hamburger-icon');
    fireEvent.click(hamburgerIcon);

    // Ensure the mobile menu is visible after clicking the hamburger icon
    const mobileMenuOpened = screen.getByTestId('mobile-home-link');
    expect(mobileMenuOpened).toBeInTheDocument();

    // Click the hamburger icon again to close the mobile menu
    fireEvent.click(hamburgerIcon);

    // Wait for the mobile menu to disappear from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-home-link')).toBeNull();
    });
  });

  test('Menu closes when a link is clicked (on mobile)', async () => {
    renderHeader();

    // Click the hamburger icon to open the mobile menu
    const hamburgerIcon = screen.getByTestId('hamburger-icon');
    fireEvent.click(hamburgerIcon);

    // Ensure the mobile menu is open and contains the "Home" link
    const mobileMenuOpened = screen.getByTestId('mobile-home-link');
    expect(mobileMenuOpened).toBeInTheDocument();

    // Click the "Home" link
    fireEvent.click(mobileMenuOpened);

    // Wait for the menu to close after the link is clicked
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-home-link')).toBeNull();
    });

    // Ensure the route has changed and the "Welcome" heading is visible
    expect(screen.getByTestId('welcome-heading')).toBeInTheDocument();
  });

  test('Header has appropriate classes', async () => {
    renderHeader();

    // Wait for the header to fully render and settle
    await waitFor(() => {
      const headerElement = screen.getByTestId('header');
      expect(headerElement).toHaveClass(
        'w-full bg-white border-b border-gray-300 shadow-sm relative'
      );
    });
  });
});
