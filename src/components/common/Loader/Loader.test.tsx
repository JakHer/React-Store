import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  test('should render the loader', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
  });

  test('should have correct spinner classes', () => {
    render(<Loader />);

    const spinner = screen.getByRole('status').firstChild;

    expect(spinner).toHaveClass('w-16');
    expect(spinner).toHaveClass('h-16');
    expect(spinner).toHaveClass('border-4');
    expect(spinner).toHaveClass('border-t-4');
    expect(spinner).toHaveClass('border-gray-300');
    expect(spinner).toHaveClass('border-t-blue-500');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('animate-spin');
  });
});
