import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  test('should render an empty state message with icon', () => {
    render(<EmptyState />);

    const icon = screen.getByTestId('shopping-cart-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-16 h-16 text-gray-400 mb-4');

    const heading = screen.getByText('No Products');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-lg font-semibold text-gray-600');

    const message = screen.getByText('Please check back later!');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-gray-500 mt-2');
  });

  test('should render the correct icon size', () => {
    render(<EmptyState />);

    const icon = screen.getByTestId('shopping-cart-icon');
    expect(icon).toHaveClass('w-16 h-16');
  });
});
