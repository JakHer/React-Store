import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { NotFound } from '../../pages/NotFound'; // Adjust the import path as needed

describe('NotFound Component', () => {
  test('Renders the 404 text correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const heading = screen.getByTestId('not-found-heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404');
  });

  test('Renders the error message correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const message = screen.getByTestId('not-found-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(
      'Oops! The page you’re looking for doesn’t exist.'
    );
  });

  test('Renders the "Go Back to Home" button', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const goHomeButton = screen.getByTestId('go-home-button');
    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton).toHaveTextContent('Go Back to Home');
  });

  test('Navigates to home when "Go Back to Home" is clicked', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const goHomeButton = screen.getByTestId('go-home-button');
    fireEvent.click(goHomeButton);

    // After clicking, the URL should be the home page
    expect(window.location.pathname).toBe('/');
  });
});
