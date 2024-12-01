import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-start text-center p-6"
      data-testid="not-found-container"
    >
      <div className="space-y-6">
        <h1
          className="text-7xl font-extrabold text-gray-800"
          data-testid="not-found-heading"
        >
          404
        </h1>
        <p
          className="text-2xl font-medium text-gray-600"
          data-testid="not-found-message"
        >
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div>
          <Link
            to="/"
            className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out"
            data-testid="go-home-button"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
