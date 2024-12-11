import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders with default properties', () => {
    render(<Button text="Click Me" />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-gray-200');
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
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('includes hover and transition classes', () => {
    render(<Button text="Hover Test" />);
    const buttonElement = screen.getByText('Hover Test');
    expect(buttonElement).toHaveClass('hover:opacity-80', 'transition-all');
  });
});
