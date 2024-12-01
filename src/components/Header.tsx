import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle the mobile menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false); // Close the menu on route change
  }, [location]);

  // Function to close the mobile menu on link click
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="w-full bg-white border-b border-gray-300 shadow-sm relative"
      data-testid="header"
    >
      <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center h-[60px]">
        {/* Left Section */}
        <ul className="flex w-full justify-between items-center space-x-6 lg:space-x-10">
          <div className="hidden lg:flex justify-start w-2/6">
            <li>
              <Link
                to="/"
                className="text-lg text-gray-800 hover:text-gray-500 transition-colors duration-300"
                data-testid="home-link"
              >
                Home
              </Link>
            </li>
          </div>

          {/* Logo Section */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-3xl font-bold text-gray-800 hover:text-gray-500 transition-colors duration-300"
              data-testid="welcome-heading"
            >
              MyReactStore
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex justify-end w-2/6">
            <li>
              <Link
                to="/store"
                className="text-lg text-gray-800 hover:text-gray-500 transition-colors duration-300"
                data-testid="store-link"
              >
                Store
              </Link>
            </li>
          </div>
        </ul>

        {/* Hamburger Menu for Mobile */}
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

      {/* Mobile Menu with Slide and Opacity Animation (from top) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-white absolute left-0 right-0 py-6 px-8 rounded-b-xl shadow-lg"
            initial={{ y: '-100%', opacity: 0 }} // Start off-screen (above) and invisible
            animate={{ y: 0, opacity: 1 }} // Slide in and fade in
            exit={{ y: '-100%', opacity: 0 }} // Slide out and fade out
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            data-testid="mobile-menu"
          >
            <ul className="flex flex-col items-center space-y-6 text-gray-800">
              <li>
                <Link
                  to="/"
                  className="text-lg text-gray-800 hover:text-gray-500 transition-colors duration-300"
                  data-testid="mobile-home-link"
                  onClick={closeMenu} // Close menu when clicked
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/store"
                  className="text-lg text-gray-800 hover:text-gray-500 transition-colors duration-300"
                  data-testid="mobile-store-link"
                  onClick={closeMenu} // Close menu when clicked
                >
                  Store
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
