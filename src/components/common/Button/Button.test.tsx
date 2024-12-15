import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders with default properties', () => {
    render(<Button text="Click Me" />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'text-sm font-medium py-2 px-4 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
    );
    expect(buttonElement).not.toBeDisabled();
  });

  test('applies custom className', () => {
    render(
      <Button
        text="Styled Button"
        className="bg-blue-500"
      />
    );
    const buttonElement = screen.getByText('Styled Button');
    expect(buttonElement).toHaveClass('bg-blue-500');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(
      <Button
        text="Click Me"
        onClick={handleClick}
      />
    );
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with data-testid', () => {
    render(
      <Button
        text="Test ID Button"
        dataTestId="button-test-id"
      />
    );
    const buttonElement = screen.getByTestId('button-test-id');
    expect(buttonElement).toBeInTheDocument();
  });

  test('disables button when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button
        text="Disabled Button"
        onClick={handleClick}
        disabled={true}
      />
    );
    const buttonElement = screen.getByText('Disabled Button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('bg-gray-400', 'cursor-not-allowed');
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders with primary variant styles', () => {
    render(
      <Button
        text="Primary Button"
        variant="primary"
      />
    );
    const buttonElement = screen.getByText('Primary Button');
    expect(buttonElement).toHaveClass(
      'bg-blue-500',
      'text-white',
      'hover:bg-blue-600'
    );
  });

  test('renders with secondary variant styles', () => {
    render(
      <Button
        text="Secondary Button"
        variant="secondary"
      />
    );
    const buttonElement = screen.getByText('Secondary Button');
    expect(buttonElement).toHaveClass(
      'bg-gray-500',
      'text-white',
      'hover:bg-gray-600'
    );
  });

  test('renders with tertiary variant styles', () => {
    render(
      <Button
        text="Tertiary Button"
        variant="tertiary"
      />
    );
    const buttonElement = screen.getByText('Tertiary Button');
    expect(buttonElement).toHaveClass(
      'bg-transparent',
      'text-blue-500',
      'border',
      'border-blue-500',
      'hover:text-blue-600'
    );
  });
  test('includes appropriate hover and transition classes', () => {
    render(<Button text="Hover Test" />);
    const buttonElement = screen.getByText('Hover Test');

    expect(buttonElement).toHaveClass('transition-all');
    expect(buttonElement).toHaveClass('hover:bg-blue-600');
  });

  test('sets aria-label from ariaLabel prop', () => {
    render(
      <Button
        text="Accessible Button"
        ariaLabel="Custom Aria Label"
      />
    );
    const buttonElement = screen.getByText('Accessible Button');
    expect(buttonElement).toHaveAttribute('aria-label', 'Custom Aria Label');
  });

  test('falls back to text for aria-label if ariaLabel prop is not provided', () => {
    render(<Button text="Fallback Aria" />);
    const buttonElement = screen.getByText('Fallback Aria');
    expect(buttonElement).toHaveAttribute('aria-label', 'Fallback Aria');
  });
});
