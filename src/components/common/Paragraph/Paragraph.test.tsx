import { render, screen } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Paragraph Component', () => {
  test('renders with default properties', () => {
    render(<Paragraph text="Hello World" />);
    const paragraphElement = screen.getByText('Hello World');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('text-gray-600');
  });

  test('applies custom className', () => {
    render(
      <Paragraph text="Custom Styled Paragraph" className="text-lg font-bold" />
    );
    const paragraphElement = screen.getByText('Custom Styled Paragraph');
    expect(paragraphElement).toHaveClass('text-gray-600 text-lg font-bold');
  });

  test('renders with data-testid', () => {
    render(
      <Paragraph text="Test ID Paragraph" dataTestId="paragraph-test-id" />
    );
    const paragraphElement = screen.getByTestId('paragraph-test-id');
    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders correct text', () => {
    const testText = 'Dynamic text content';
    render(<Paragraph text={testText} />);
    const paragraphElement = screen.getByText(testText);
    expect(paragraphElement).toHaveTextContent(testText);
  });

  test('handles empty text gracefully', () => {
    render(<Paragraph text="" dataTestId="empty-paragraph" />);
    const paragraphElement = screen.getByTestId('empty-paragraph');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveTextContent('');
  });
});
