import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { ProductErrorProps } from './ProductError.types';

const ProductError: React.FC<ProductErrorProps> = ({ errorMessage }) => {
  return (
    <div
      className="flex items-center justify-center text-center p-4 mb-4 border-2 border-gray-300 text-gray-800 rounded-lg shadow-sm"
      data-testid="product-error-container">
      <ExclamationCircleIcon
        data-testid="error-icon"
        className="mr-3 h-8 w-8 text-gray-600"
      />
      <p
        className="text-lg font-semibold"
        data-testid="error-message">
        {`Error: ${errorMessage}`}
      </p>
    </div>
  );
};

export default ProductError;
