import { render, screen, fireEvent } from '@testing-library/react';
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

  test('Renders the navigation logo', () => {
    renderHeader();

    const logo = screen.getByText(/MyReactStore/i);
    expect(logo).toBeInTheDocument();
  });

  test('Header has appropriate classes', () => {
    renderHeader();

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass(
      'w-full bg-transparent border-b border-gray-300 shadow-sm relative'
    );
  });
});
