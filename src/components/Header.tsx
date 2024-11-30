import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="w-full bg-transparent border-b border-gray-300 shadow-sm relative">
    <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
      <ul className="flex w-full justify-between">
        <div className="flex justify-start w-2/6">
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

        <div>
          <Link
            to="/"
            className="transform -translate-x-1/2 text-3xl font-bold text-gray-800 hover:text-gray-500 transition-colors duration-300"
            data-testid="welcome-heading"
          >
            MyReactStore
          </Link>
        </div>

        <div className="flex justify-end w-2/6">
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
    </nav>
  </header>
);
