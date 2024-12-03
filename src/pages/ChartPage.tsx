import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/Store';
import { useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const CartPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleGoToStore = () => {
    navigate('/store');
  };

  const handleIncrease = (productId: number) => {
    const product = store.cart.find((item) => item.product.id === productId);
    if (product) {
      store.addToCart(product.product);
    }
  };

  const handleDecrease = (productId: number) => {
    const product = store.cart.find((item) => item.product.id === productId);
    if (product && product.quantity > 1) {
      store.removeFromCart(product.product.id);
    }
  };

  const handleRemoveItem = (productId: number) => {
    store.removeProductFromCart(productId);
  };

  const handleClearCart = () => {
    store.clearCart();
  };

  return (
    <div className="flex items-center justify-center py-10 px-4 bg-gray-50">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center lg:text-left text-gray-800 mb-8">
          Your Shopping Cart
        </h1>

        {store.cart.length > 0 ? (
          <div className="space-y-8">
            <ul className="space-y-6">
              {store.cart.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-102"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-2/3 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDecrease(product.id)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="text-lg font-semibold text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(product.id)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 ml-4">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="ml-4 text-red-600 hover:text-red-800 transition"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total and Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Total: ${store.cartTotal.toFixed(2)}
                </h2>
              </div>
              <div className="flex space-x-4">
                {/* Clear Cart Button */}
                <button
                  onClick={handleClearCart}
                  className={`flex items-center px-6 py-3 text-white rounded-md hover:bg-opacity-90 transition transform hover:scale-102 ${
                    store.cart.length > 0
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={store.cart.length === 0}
                >
                  <TrashIcon className="h-5 w-5 inline-block mr-2" />
                  Clear Cart
                </button>

                {/* Continue Shopping Button */}
                <button
                  onClick={handleGoToStore}
                  className={`flex items-center px-6 py-3 text-white rounded-md hover:bg-opacity-90 transition transform hover:scale-102 ${
                    store.cart.length > 0
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={store.cart.length === 0}
                >
                  <ArrowRightIcon className="h-5 w-5 inline-block mr-2" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center pt-3">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                Your cart is empty
              </p>
              <button
                onClick={handleGoToStore}
                className="mt-6 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-blue-700 transition"
              >
                <ArrowRightIcon className="h-5 w-5 inline-block mr-2" />
                Go to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartPage;
