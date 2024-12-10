import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title Component', () => {
  test('renders with default properties', () => {
    render(<Title title="Default Title" />);
    const titleElement = screen.getByText('Default Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      'text-xl font-semibold text-gray-800 mb-4'
    );
  });

  test('applies custom className', () => {
    render(
      <Title
        title="Custom Styled Title"
        className="text-blue-500 underline"
      />
    );
    const titleElement = screen.getByText('Custom Styled Title');
    expect(titleElement).toHaveClass('text-blue-500 underline');
    expect(titleElement).toHaveClass(
      'text-xl font-semibold text-gray-800 mb-4'
    );
  });

  test('renders with data-testid', () => {
    render(
      <Title
        title="Test ID Title"
        dataTestId="title-test-id"
      />
    );
    const titleElement = screen.getByTestId('title-test-id');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test ID Title');
  });

  test('renders correct title text', () => {
    const testTitle = 'Dynamic Title Content';
    render(<Title title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toHaveTextContent(testTitle);
  });

  test('handles empty title gracefully', () => {
    render(
      <Title
        title=""
        dataTestId="empty-title"
      />
    );
    const titleElement = screen.getByTestId('empty-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(''); // Explicitly check for empty content
  });
});
