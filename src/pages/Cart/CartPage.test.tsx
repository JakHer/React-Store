import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import CartPage from './CartPage';
import { act } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  cart: CartItem[];
  cartTotal: number;
  addToCart: jest.Mock;
  removeFromCart: jest.Mock;
  removeProductFromCart: jest.Mock;
  clearCart: jest.Mock;
  fetchProducts: jest.Mock;
}

jest.mock('../../context/FirebaseContext', () => ({
  useFirebase: jest.fn(),
}));

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <CartPage />
    </MemoryRouter>
  );
};

describe('CartPage', () => {
  let mockStore: Store;

  beforeEach(() => {
    mockStore = {
      cart: [],
      cartTotal: 0,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      removeProductFromCart: jest.fn(),
      clearCart: jest.fn(),
      fetchProducts: jest.fn(),
    };

    (useFirebase as jest.Mock).mockReturnValue({ store: mockStore });
  });

  test('renders empty cart message when no items are in the cart', () => {
    renderWithRouter();

    expect(screen.getByTestId('empty-cart-message')).toBeInTheDocument();
    expect(screen.getByTestId('go-to-store-button')).toBeInTheDocument();
  });

  test('renders cart items when products are in the cart', () => {
    mockStore.cart = [
      {
        product: {
          id: '1',
          name: 'Product 1',
          description: 'Great product',
          price: 10,
        },
        quantity: 2,
      },
    ];
    mockStore.cartTotal = 20;

    renderWithRouter();

    expect(screen.getByTestId('cart-container')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-1')).toHaveTextContent('2');
    expect(screen.getByTestId('price-1')).toHaveTextContent('$20.00');
  });

  test('increases item quantity when plus button is clicked', () => {
    mockStore.cart = [
      {
        product: {
          id: '1',
          name: 'Product 1',
          description: 'Great product',
          price: 10,
        },
        quantity: 1,
      },
    ];
    mockStore.cartTotal = 10;

    renderWithRouter();

    const increaseButton = screen.getByTestId('increase-1');
    fireEvent.click(increaseButton);

    expect(mockStore.addToCart).toHaveBeenCalledTimes(1);
  });

  test('decreases item quantity when minus button is clicked', () => {
    mockStore.cart = [
      {
        product: {
          id: '1',
          name: 'Product 1',
          description: 'Great product',
          price: 10,
        },
        quantity: 2,
      },
    ];
    mockStore.cartTotal = 20;

    renderWithRouter();

    const decreaseButton = screen.getByTestId('decrease-1');
    fireEvent.click(decreaseButton);

    expect(mockStore.removeFromCart).toHaveBeenCalledTimes(1);
  });

  test('removes item from cart when remove button is clicked', () => {
    mockStore.cart = [
      {
        product: {
          id: '1',
          name: 'Product 1',
          description: 'Great product',
          price: 10,
        },
        quantity: 2,
      },
    ];
    mockStore.cartTotal = 20;

    renderWithRouter();

    const removeButton = screen.getByTestId('remove-1');
    fireEvent.click(removeButton);

    expect(mockStore.removeProductFromCart).toHaveBeenCalledTimes(1);
  });

  test('clears the cart when clear cart button is clicked', async () => {
    mockStore.cart = [
      {
        product: {
          id: '1',
          name: 'Product 1',
          description: 'Great product',
          price: 10,
        },
        quantity: 2,
      },
    ];
    mockStore.cartTotal = 20;

    renderWithRouter();

    const clearButton = screen.getByTestId('clear-cart-button');
    await act(async () => {
      fireEvent.click(clearButton);
    });

    expect(mockStore.clearCart).toHaveBeenCalledTimes(1);
  });
});
