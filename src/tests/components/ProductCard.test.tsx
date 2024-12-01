import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../../components/ProductCard';

describe('ProductCard Component', () => {
  const productProps = {
    name: 'Test Product',
    description: 'This is a test description.',
    price: 19.99,
  };

  test('renders product name, description, and price', () => {
    render(<ProductCard {...productProps} />);

    expect(screen.getByText(productProps.name)).toBeInTheDocument();

    expect(screen.getByText(productProps.description)).toBeInTheDocument();

    expect(
      screen.getByText(`$${productProps.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  test('renders "Add to Cart" button', () => {
    render(<ProductCard {...productProps} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  test('hover effect works on card', async () => {
    render(<ProductCard {...productProps} />);
    const productTestId = `product-card-${productProps.name}`;
    const card = screen.getByTestId(productTestId);

    expect(card).toHaveClass('cursor-pointer');
    await userEvent.hover(card);
  });
});
