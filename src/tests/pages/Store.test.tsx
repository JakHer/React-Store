import { render, screen } from '@testing-library/react';
import { Store } from '../../pages/Store';
import userEvent from '@testing-library/user-event';

describe('Store Component', () => {
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
    expect(productCards).toHaveLength(3);

    const productNames = ['Product 1', 'Product 2', 'Product 3'];
    const productPrices = ['$25.99', '$15.99', '$35.99'];

    productNames.forEach((name, index) => {
      const productCard = screen.getByTestId(`product-card-${name}`);
      expect(productCard).toBeInTheDocument();

      const productName = screen.getByText(name);
      expect(productName).toBeInTheDocument();

      const productPrice = screen.getByText(productPrices[index]);
      expect(productPrice).toBeInTheDocument();
    });
  });

  test('Product Card hover effect', async () => {
    render(<Store />);

    const card = screen.getByTestId('product-card-Product 1');
    expect(card).toHaveClass('cursor-pointer');
    await userEvent.hover(card);
  });
});
