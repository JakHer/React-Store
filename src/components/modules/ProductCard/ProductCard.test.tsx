import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import store from '../../../store/Store';
import ProductCard from './ProductCard';

jest.mock('../../../store/Store', () => ({
  ...jest.requireActual('../../../store/Store'),
  addToCart: jest.fn(),
  cart: [],
  products: [
    {
      id: 1,
      name: 'Product 1',
      description: 'Amazing product 1',
      price: 25.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Amazing product 2',
      price: 15.99,
    },
  ],
}));

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders product card correctly', () => {
    render(<ProductCard />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Amazing product 1')).toBeInTheDocument();
    expect(screen.getByText('$25.99')).toBeInTheDocument();

    expect(screen.getByTestId('add-to-cart-button-1')).toBeInTheDocument();
  });

  test('Calls addToCart when Add to Cart button is clicked', () => {
    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1');

    fireEvent.click(addToCartButton);

    expect(store.addToCart).toHaveBeenCalledTimes(1);
    expect(store.addToCart).toHaveBeenCalledWith(store.products[0]);
  });

  test('Button is disabled and shows "Already in Cart" if product is in cart', () => {
    store.cart.push({ product: store.products[0], quantity: 1 });

    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1');

    expect(addToCartButton).toBeDisabled();
    expect(addToCartButton).toHaveTextContent('Already in Cart');
  });

  test('Cart updates correctly when Add to Cart button is clicked', () => {
    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1');
    fireEvent.click(addToCartButton);

    expect(store.cart.length).toBe(1);
    expect(store.cart[0].product.id).toBe(1);
  });

  test('Product card has animation when it appears', async () => {
    const { container } = render(<ProductCard />);

    const motionDiv = container.querySelector('.bg-white');

    await waitFor(() => {
      expect(motionDiv).toHaveStyle('opacity: 1');
    });
  });
});
