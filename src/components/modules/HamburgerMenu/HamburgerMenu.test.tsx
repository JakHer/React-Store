import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { HamburgerMenuProps } from './HamburgerMenu.types';
import { HamburgerMenu } from './HamburgerMenu';

const rendersMenu = (props: Partial<HamburgerMenuProps> = {}) => {
  const defaultProps: HamburgerMenuProps = {
    menuOpen: true,
    toggleMenu: jest.fn(),
  };

  render(
    <BrowserRouter>
      <HamburgerMenu
        {...defaultProps}
        {...props}
      />
    </BrowserRouter>
  );

  return {
    toggleMenu: defaultProps.toggleMenu,
  };
};

describe('HamburgerMenu Component', () => {
  test('Renders menu wrapper correctly when menuOpen is true', () => {
    rendersMenu({ menuOpen: true });

    const menuWrapper = screen.getByTestId('mobile-menu');
    expect(menuWrapper).toBeInTheDocument();
  });

  test('Does not render menu when menuOpen is false', () => {
    rendersMenu({ menuOpen: false });

    const menuWrapper = screen.queryByTestId('mobile-menu');
    expect(menuWrapper).not.toBeInTheDocument();
  });

  test('Calls toggleMenu when a link is clicked', () => {
    const { toggleMenu } = rendersMenu({ menuOpen: true });

    const homeLink = screen.getByTestId('mobile-home-link');
    fireEvent.click(homeLink);

    expect(toggleMenu).toHaveBeenCalledTimes(1);
  });
});
