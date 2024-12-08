import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuLinkProps } from './MenuLink.types';
import { MenuLink } from './MenuLink';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const { useLocation } = jest.requireMock('react-router-dom');

const rendersLink = (props: Partial<MenuLinkProps> = {}) => {
  const defaultProps: MenuLinkProps = {
    to: '/',
    text: 'Home',
    mobile: false,
    onClick: jest.fn(),
  };

  render(
    <BrowserRouter>
      <MenuLink {...defaultProps} {...props} />
    </BrowserRouter>
  );

  return {
    onClick: defaultProps.onClick,
  };
};

beforeEach(() => {
  useLocation.mockReturnValue({ pathname: '/' });
});

describe('MenuLink Component', () => {
  test('Renders link with correct text and attributes', () => {
    render(
      <BrowserRouter>
        <MenuLink to="/store" text="Store" />
      </BrowserRouter>
    );

    const link = screen.getByText('Store');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/store');
  });

  test('Applies active class when the link is active', () => {
    useLocation.mockReturnValue({ pathname: '/store' });

    render(
      <BrowserRouter>
        <MenuLink to="/store" text="Store" />
      </BrowserRouter>
    );

    const link = screen.getByText('Store');

    expect(link).toHaveClass('text-gray-500 cursor-not-allowed');
  });

  test('Applies default styles when the link is not active', () => {
    useLocation.mockReturnValue({ pathname: '/' });

    render(
      <BrowserRouter>
        <MenuLink to="/store" text="Store" />
      </BrowserRouter>
    );

    const link = screen.getByText('Store');

    expect(link).toHaveClass('text-gray-800 hover:text-gray-500');
  });
  test('Applies default styles when link is not active', () => {
    rendersLink({ text: 'Store', to: '/store' });

    const link = screen.getByText('Store');
    expect(link).toHaveClass('text-gray-800 hover:text-gray-500');
  });

  test('Calls onClick when link is clicked', () => {
    const { onClick } = rendersLink({ text: 'Home', to: '/' });

    const link = screen.getByText('Home');
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Renders with mobile-specific data-testid when mobile is true', () => {
    rendersLink({ text: 'Home', to: '/', mobile: true });

    const link = screen.getByTestId('mobile-home-link');
    expect(link).toBeInTheDocument();
  });

  test('Renders with desktop-specific data-testid when mobile is false', () => {
    rendersLink({ text: 'Home', to: '/', mobile: false });

    const link = screen.getByTestId('home-link');
    expect(link).toBeInTheDocument();
  });
});
