import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import store from '../../../store/Store';
import { CartIcon } from './CartIcon';

jest.mock('../../../store/Store', () => ({
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  cartTotal: 0,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CartIcon', () => {
  beforeEach(() => {
    store.cart = [];
  });

  it('should render the cart icon', () => {
    render(
      <Router>
        <CartIcon />
      </Router>
    );

    const cartButton = screen.getByTitle('Shopping Cart');
    expect(cartButton).toBeInTheDocument();
    expect(cartButton).toHaveClass('bg-blue-500');
  });

  it('should show the correct cart item count', () => {
    store.cart = [
      {
        product: { id: 1, name: 'Product 1', description: '', price: 0 },
        quantity: 0,
      },
      {
        product: { id: 2, name: 'Product 2', description: '', price: 0 },
        quantity: 0,
      },
    ];

    render(
      <Router>
        <CartIcon />
      </Router>
    );

    const cartCount = screen.getByText('2');
    expect(cartCount).toBeInTheDocument();
  });

  it('should animate the cart icon when there are items in the cart', async () => {
    store.cart = [
      {
        product: {
          id: 1,
          name: 'Product 1',
          description: '',
          price: 0,
        },
        quantity: 0,
      },
    ];

    render(
      <Router>
        <CartIcon />
      </Router>
    );

    const cartButton = screen.getByTitle('Shopping Cart');

    // Wait for the animation to apply
    await waitFor(() => {
      const transformStyle = cartButton.style.transform;

      // Extract the scale and rotate values from the transform string using regex
      const scaleMatch = transformStyle.match(/scale\(([^)]+)\)/);
      const rotateMatch = transformStyle.match(/rotate\(([^)]+)\)/);

      if (scaleMatch && rotateMatch) {
        const scaleValue = parseFloat(scaleMatch[1]);
        const rotateValue = parseFloat(rotateMatch[1]);

        // Check that the scale value is within a reasonable tolerance range
        expect(scaleValue).toBeGreaterThanOrEqual(1.15); // Check for 1.2 scale +/- tolerance
        expect(scaleValue).toBeLessThanOrEqual(1.25);

        // Check that the rotate value is close to 0 (due to animation)
        expect(rotateValue).toBeGreaterThanOrEqual(0);
        expect(rotateValue).toBeLessThanOrEqual(10); // Assuming the rotate value is small
      }
    });

    // After the animation, check if it resets
    await waitFor(() => {
      const transformStyle = cartButton.style.transform;

      // Check that the transform value returns to scale(1)
      const scaleMatch = transformStyle.match(/scale\(([^)]+)\)/);
      if (scaleMatch) {
        const scaleValue = parseFloat(scaleMatch[1]);
        expect(scaleValue).toBeCloseTo(1, 2); // Check that it resets to scale(1) with 2 decimal places
      }
    });
  });

  it('should navigate to the /chart route when clicked', () => {
    const navigate = jest.fn(); // This will be the mocked function

    // Mock the useNavigate hook to return the mocked function
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Router>
        <CartIcon />
      </Router>
    );

    const cartButton = screen.getByTitle('Shopping Cart');
    fireEvent.click(cartButton);

    // Ensure that navigate is called with the correct path
    expect(navigate).toHaveBeenCalledWith('/chart');
  });

  it('should not show the cart count when the cart is empty', () => {
    render(
      <Router>
        <CartIcon />
      </Router>
    );
    const cartCount = screen.queryByText('0');

    // Assert that the cart count element is not rendered when the cart is empty
    expect(cartCount).not.toBeInTheDocument();
  });
});
