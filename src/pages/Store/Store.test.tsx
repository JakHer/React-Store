import { render, screen } from '@testing-library/react';
import { Store } from '../../pages/Store/Store';
import userEvent from '@testing-library/user-event';
import store from '../../store/Store';

jest.mock('../../store/Store', () => ({
  ...jest.requireActual('../../store/Store'),
  fetchProducts: jest.fn(),
  addToCart: jest.fn(),
}));

describe('Store Page', () => {
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

    const fetchProductsMock = jest.spyOn(store, 'fetchProducts');
    fetchProductsMock.mockResolvedValueOnce(undefined);
  });

  test('Renders Header and Description', () => {
    render(<Store />);

    const heading = screen.getByText(/Our Products/i);
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /Browse our curated selection of top-quality products/i
    );
    expect(description).toBeInTheDocument();
  });

  test('Displays Product Cards', () => {
    render(<Store />);

    const productCards = screen.getAllByTestId(/^product-card-/);
    expect(productCards).toHaveLength(1);

    const productName = screen.getByTestId(`product-title-${mockProduct.name}`);
    expect(productName).toBeInTheDocument();

    const productPrice = screen.getByTestId(
      `product-price-${mockProduct.price}`
    );
    expect(productPrice).toBeInTheDocument();
  });

  test('Product Card hover effect', async () => {
    render(<Store />);

    const card = screen.getByTestId(`product-card-${mockProduct.id}`);
    expect(card).toHaveClass('cursor-pointer');

    await userEvent.hover(card);
  });
});
