import { Link, useLocation } from 'react-router-dom';

interface MenuLinkProps {
  to: string;
  text: string;
  mobile?: boolean;
  onClick?: () => void;
}

export const MenuLink: React.FC<MenuLinkProps> = ({
  to,
  text,
  onClick,
  mobile,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`text-lg transition-colors duration-300 ${
          isActive
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-gray-800 hover:text-gray-500'
        }`}
        data-testid={`${mobile ? 'mobile-' : ''}${text.toLowerCase()}-link`}
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
};
