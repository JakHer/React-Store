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
        product: { id: 'test-1', name: 'Product 1', description: '', price: 0 },
        quantity: 0,
      },
      {
        product: { id: 'test-2', name: 'Product 2', description: '', price: 0 },
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
          id: 'test-1',
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

    await waitFor(() => {
      const transformStyle = cartButton.style.transform;

      const scaleMatch = transformStyle.match(/scale\(([^)]+)\)/);
      const rotateMatch = transformStyle.match(/rotate\(([^)]+)\)/);

      if (scaleMatch && rotateMatch) {
        const scaleValue = parseFloat(scaleMatch[1]);
        const rotateValue = parseFloat(rotateMatch[1]);

        expect(scaleValue).toBeGreaterThanOrEqual(1.15);
        expect(scaleValue).toBeLessThanOrEqual(1.25);

        expect(rotateValue).toBeGreaterThanOrEqual(0);
        expect(rotateValue).toBeLessThanOrEqual(10);
      }
    });

    await waitFor(() => {
      const transformStyle = cartButton.style.transform;

      const scaleMatch = transformStyle.match(/scale\(([^)]+)\)/);
      if (scaleMatch) {
        const scaleValue = parseFloat(scaleMatch[1]);
        expect(scaleValue).toBeCloseTo(1, 2);
      }
    });
  });

  it('should navigate to the /chart route when clicked', () => {
    const navigate = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Router>
        <CartIcon />
      </Router>
    );

    const cartButton = screen.getByTitle('Shopping Cart');
    fireEvent.click(cartButton);

    expect(navigate).toHaveBeenCalledWith('/chart');
  });

  it('should not show the cart count when the cart is empty', () => {
    render(
      <Router>
        <CartIcon />
      </Router>
    );
    const cartCount = screen.queryByText('0');

    expect(cartCount).not.toBeInTheDocument();
  });
});
