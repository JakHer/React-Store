import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders the footer content correctly', () => {
    render(<Footer />);

    const footerText = screen.getByText(/JH. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  test('displays the correct current year', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const yearText = screen.getByText(new RegExp(currentYear.toString(), 'i'));
    expect(yearText).toBeInTheDocument();
  });

  test('has the correct CSS classes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(
      'fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 text-center py-2 text-sm text-gray-600'
    );
  });
});
