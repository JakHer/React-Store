import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { observer } from 'mobx-react-lite';
import ProductCard from '../../components/ProductCard'; // Adjust with correct path
import { Product } from '../../types/types';
import store from '../../store/Store';

// Mocking the Store methods to prevent actual mutations in the store during tests
jest.mock('../../store/Store', () => ({
  ...jest.requireActual('../../store/Store'),
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
    jest.clearAllMocks(); // Clear previous calls to mocked methods
  });

  test('Renders product card correctly', () => {
    render(<ProductCard />);

    // Ensure product name, description, and price are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Amazing product 1')).toBeInTheDocument();
    expect(screen.getByText('$25.99')).toBeInTheDocument();

    // Ensure Add to Cart button is present for Product 1
    expect(screen.getByTestId('add-to-cart-button-1')).toBeInTheDocument();
  });

  test('Calls addToCart when Add to Cart button is clicked', () => {
    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1'); // Target button for Product 1

    // Simulate clicking the button
    fireEvent.click(addToCartButton);

    // Verify that the store.addToCart function was called with the correct product
    expect(store.addToCart).toHaveBeenCalledTimes(1);
    expect(store.addToCart).toHaveBeenCalledWith(store.products[0]);
  });

  test('Button is disabled and shows "Already in Cart" if product is in cart', () => {
    // Manually adding the product to the cart in the store
    store.cart.push({ product: store.products[0], quantity: 1 });

    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1'); // Target button for Product 1

    // Ensure the button is disabled
    expect(addToCartButton).toBeDisabled();
    expect(addToCartButton).toHaveTextContent('Already in Cart');
  });

  test('Cart updates correctly when Add to Cart button is clicked', () => {
    render(<ProductCard />);

    const addToCartButton = screen.getByTestId('add-to-cart-button-1'); // Target button for Product 1

    // Click the Add to Cart button
    fireEvent.click(addToCartButton);

    // Verify the cart has been updated with the product
    expect(store.cart.length).toBe(1);
    expect(store.cart[0].product.id).toBe(1);
  });

  test('Product card has animation when it appears', async () => {
    // Here we check if the motion.div is rendering correctly, especially the animation classes
    const { container } = render(<ProductCard />);

    // Use waitFor to wait for opacity to become 1 after animation
    const motionDiv = container.querySelector('.bg-white');

    await waitFor(() => {
      expect(motionDiv).toHaveStyle('opacity: 1');
    });
  });
});
