import { render, screen } from '@testing-library/react';
import ProductError from './ProductError';

describe('ProductError Component', () => {
  const errorMessage = 'Something went wrong while fetching products';

  test('should render the error message correctly', () => {
    render(<ProductError errorMessage={errorMessage} />);

    const errorText = screen.getByTestId('error-message');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent(`Error: ${errorMessage}`);
  });

  test('should render the error icon correctly', () => {
    render(<ProductError errorMessage={errorMessage} />);

    const icon = screen.getByTestId('error-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-8 w-8 text-gray-600');
  });

  test('should render the container with proper styles', () => {
    render(<ProductError errorMessage={errorMessage} />);

    const container = screen.getByTestId('product-error-container');
    expect(container).toHaveClass(
      'flex items-center justify-center text-center p-4 mb-4 border-2 border-gray-300 text-gray-800 rounded-lg shadow-sm'
    );
  });
});
