import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuLink } from '../MenuLink/MenuLink';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className="w-full bg-white border-b border-gray-300 shadow-sm relative"
      data-testid="header"
    >
      <nav className="mx-auto px-8 py-4 flex justify-around items-center h-[60px]">
        <ul className="flex w-full justify-between items-center">
          <div className="hidden lg:flex justify-start w-[40%] gap-8">
            <MenuLink
              to="/"
              text="Home"
            />
          </div>

          <div className="flex justify-center align-center">
            <Link
              to="/"
              className="text-3xl font-bold text-gray-800 hover:text-gray-500 transition-colors duration-300"
              data-testid="welcome-heading"
            >
              MyReactStore&apos;s
            </Link>
          </div>

          <div className="hidden lg:flex justify-end w-[40%] gap-8">
            <MenuLink
              to="/store"
              text="Store"
            />
            <MenuLink
              to="/cart"
              text="Cart"
            />
          </div>
        </ul>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
          data-testid="hamburger-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <HamburgerMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};
