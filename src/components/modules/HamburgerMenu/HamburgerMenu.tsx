import { motion, AnimatePresence } from 'framer-motion';
import { MenuLink } from '../MenuLink/MenuLink';
import { HamburgerMenuProps } from './HamburgerMenu.types';

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  menuOpen,
  toggleMenu,
}) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="lg:hidden bg-white absolute left-0 right-0 py-6 px-8 rounded-b-xl shadow-lg z-50"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          data-testid="mobile-menu"
        >
          <ul className="flex flex-col items-center space-y-6 text-gray-800 ">
            <MenuLink
              to="/"
              text="Home"
              onClick={toggleMenu}
              mobile
            />
            <MenuLink
              to="/store"
              text="Store"
              onClick={toggleMenu}
              mobile
            />
            <MenuLink
              to="/cart"
              text="Cart"
              onClick={toggleMenu}
              mobile
            />
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
