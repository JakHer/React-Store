import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const EmptyState: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center items-center py-8"
      data-testid="empty-state"
    >
      <ShoppingCartIcon
        data-testid="shopping-cart-icon"
        className="w-16 h-16 text-gray-400 mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-600">No Products</h2>
      <p className="text-gray-500 mt-2">Please check back later!</p>
    </div>
  );
};

export default EmptyState;
