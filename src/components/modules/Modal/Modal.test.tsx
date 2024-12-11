import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import store from '../../../store/Store';
import { Modal } from './Modal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Modal Component', () => {
  const mockNavigate = jest.fn();

  // Mock the products array in the store
  const mockProducts = [
    {
      id: 'Test ID 1',
      name: 'Product 1',
      price: 100,
      description: 'Test Description 1',
    },
    {
      id: 'Test ID 2',
      name: 'Product 2',
      price: 200,
      description: 'Test Description 2',
    },
  ];

  const renderModal = () =>
    render(
      <Router>
        <Modal />
      </Router>
    );

  beforeEach(() => {
    store.clearCart();
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mock the store's products to return mockProducts
    store.products = mockProducts; // Ensure this is set up correctly
  });

  test('should show the modal when an item is added to the cart', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    const product = store.products[0]; // Use the mocked product
    store.addToCart(product);

    renderModal();

    const modalTitle = screen.getByTestId('modal-title');
    expect(modalTitle).toBeInTheDocument();
    expect(screen.getByText('Item Added to Cart')).toBeInTheDocument();
    expect(screen.getByTestId('product-name').textContent).toBe(product.name);
    expect(screen.getByTestId('product-price').textContent).toBe(
      `$${product.price.toFixed(2)} x 1`
    );
    expect(screen.getByTestId('subtotal').textContent).toBe(
      `Subtotal: $${product.price.toFixed(2)}`
    );
  });

  test('should hide the modal when "Continue Shopping" is clicked', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    const product = store.products[0];
    store.addToCart(product);

    renderModal();

    fireEvent.click(screen.getByTestId('continue-shopping-btn'));

    await waitFor(() => {
      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    });
  });

  test('should navigate to cart page when "Go to Cart" is clicked', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    const product = store.products[0];
    store.addToCart(product);

    renderModal();

    fireEvent.click(screen.getByTestId('go-to-cart-btn'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });

  test('should not show modal if cart is empty', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    renderModal();

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  test('should show modal when adding multiple items to the cart', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    const product1 = store.products[0];
    const product2 = store.products[1];

    store.addToCart(product1);
    store.addToCart(product2);

    renderModal();

    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toBeInTheDocument();
  });

  test('should show the modal when an item is added to the cart on the /store route', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/store' });

    const product = store.products[0];
    store.addToCart(product);

    renderModal();

    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toBeInTheDocument();
  });
});
