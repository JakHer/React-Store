import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import store from '../../store/Store';
import { Modal } from '../../components/Modal';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Modal Component', () => {
  beforeEach(() => {
    // Clear the cart and reset the store before each test
    store.clearCart();
  });

  test('should show the modal when an item is added to the cart', async () => {
    // Add an item to the cart
    const product = store.products[0];
    store.addToCart(product);

    // Render the modal component inside a Router for navigation to work
    render(
      <Router>
        <Modal />
      </Router>
    );

    // Check if modal elements are displayed
    const modalTitle = screen.getByTestId('modal-title');
    expect(modalTitle).toBeInTheDocument();
    expect(screen.getByText('Item Added to Cart')).toBeInTheDocument();

    // Verify product details in the modal
    expect(screen.getByTestId('product-name').textContent).toBe(product.name);
    expect(screen.getByTestId('product-price').textContent).toBe(
      `$${product.price.toFixed(2)} x 1`
    );
    expect(screen.getByTestId('subtotal').textContent).toBe(
      `Subtotal: $${product.price.toFixed(2)}`
    );
  });

  test('should hide the modal when "Continue Shopping" is clicked', async () => {
    // Add an item to the cart
    const product = store.products[0];
    store.addToCart(product);

    // Render the modal component inside a Router for navigation to work
    render(
      <Router>
        <Modal />
      </Router>
    );

    // Click "Continue Shopping"
    fireEvent.click(screen.getByTestId('continue-shopping-btn'));

    // Wait for the modal to be hidden
    await waitFor(() => {
      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    });
  });

  test('should navigate to chart page when "Go to Chart" is clicked', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Add an item to the cart
    const product = store.products[0];
    store.addToCart(product);

    // Render the modal component inside a Router for navigation to work
    render(
      <Router>
        <Modal />
      </Router>
    );

    // Click "Go to Chart"
    fireEvent.click(screen.getByTestId('go-to-chart-btn'));

    // Check if navigate was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/chart');
    });
  });

  test('should not show modal if cart is empty', () => {
    // Render the modal when the cart is empty
    render(
      <Router>
        <Modal />
      </Router>
    );

    // Check that the modal doesn't render
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  test('should show modal when adding multiple items to the cart', () => {
    const product1 = store.products[0];
    const product2 = store.products[1];

    // Add first item to the cart
    store.addToCart(product1);

    // Add second item to the cart
    store.addToCart(product2);

    // Render the modal component
    render(
      <Router>
        <Modal />
      </Router>
    );

    // Check that modal is shown after the first product is added
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();

    // Check that the second item added doesn't show the modal again
    expect(screen.queryByTestId('modal-title')).toBeInTheDocument();
  });
});
