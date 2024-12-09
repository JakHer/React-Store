import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import store from '../../../store/Store';
import ProductCard from './ProductCard';

// Mock the necessary methods from store
jest.mock('../../../store/Store', () => ({
  ...jest.requireActual('../../../store/Store'),
  fetchProducts: jest.fn(),
  addToCart: jest.fn(),
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 Description',
    price: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.products = [mockProduct];
    store.cart = [];
    store.productError = null;
    store.isLoading = false;

    // Ensure that fetchProducts is mocked to immediately return data
    const fetchProductsMock = jest.spyOn(store, 'fetchProducts');
    fetchProductsMock.mockResolvedValueOnce(undefined); // We mock the resolved value to simulate success
  });

  test('should display loader when products are loading', () => {
    store.isLoading = true;
    render(<ProductCard />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should display empty state when no products are available', () => {
    store.products = [];
    render(<ProductCard />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  test('should display ProductError when there is an error fetching products', () => {
    store.productError = 'Error: Failed to fetch products';
    render(<ProductCard />);
    expect(screen.getByTestId('product-error-container')).toBeInTheDocument();
    expect(
      screen.getByText(/Error: Failed to fetch products/)
    ).toBeInTheDocument();
  });

  test('should render product cards when products are fetched successfully', async () => {
    store.isLoading = false;
    store.productError = null;
    store.products = [
      {
        id: '1',
        name: 'test-title',
        description: 'test-description',
        price: 12.99,
      },
    ];

    render(<ProductCard />);
    await waitFor(() => {
      expect(
        screen.getByTestId('product-title-test-title')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('product-paragraph-test-description')
      ).toHaveTextContent('test-description');
      expect(screen.getByTestId('product-price-12.99')).toHaveTextContent(
        '$12.99'
      );
    });
  });

  test('should call addToCart when the Add to Cart button is clicked', async () => {
    render(<ProductCard />);
    const addToCartButton = screen.getByTestId('add-to-cart-button-1');
    fireEvent.click(addToCartButton);
    expect(store.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('should disable "Add to Cart" button if product is already in cart', async () => {
    store.cart = [{ product: mockProduct, quantity: 1 }];
    render(<ProductCard />);
    const addToCartButton = screen.getByTestId('add-to-cart-button-1');
    expect(addToCartButton).toBeDisabled();
    expect(addToCartButton).toHaveTextContent('Already in Cart');
  });
});
