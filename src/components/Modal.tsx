import { observer } from 'mobx-react-lite';
import store from '../store/Store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Modal: React.FC = observer(() => {
  const navigate = useNavigate();

  const lastAddedItem =
    store.cart.length > 0 ? store.cart[store.cart.length - 1] : null;

  const closeModal = () => {
    store.hideModal();
  };

  useEffect(() => {
    if (store.cart.length === 1) {
      store.hasModalShown = true;
    }
  }, [store.cart.length]);

  if (!lastAddedItem || !store.hasModalShown) return null;

  const { product, quantity } = lastAddedItem;

  const navigateToChart = () => {
    store.hideModal();
    navigate('/chart');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-testid="modal-overlay"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
        data-testid="modal-container"
      >
        <h2 className="text-xl font-bold mb-4" data-testid="modal-title">
          Item Added to Cart
        </h2>
        <div className="mb-6" data-testid="modal-details">
          <h3 className="text-lg font-semibold" data-testid="product-name">
            {product.name}
          </h3>
          <p
            className="text-gray-600 text-sm"
            data-testid="product-description"
          >
            {product.description}
          </p>
          <p
            className="text-yellow-500 text-lg font-bold mt-2"
            data-testid="product-price"
          >
            ${product.price.toFixed(2)} x {quantity}
          </p>
          <p className="text-gray-800 font-bold mt-2" data-testid="subtotal">
            Subtotal: ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
        <p className="text-gray-600 mb-6" data-testid="modal-message">
          Would you like to continue shopping or go to the store?
        </p>
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full text-sm hover:bg-gray-300 transition-all"
            data-testid="continue-shopping-btn"
          >
            Continue Shopping
          </button>
          <button
            onClick={navigateToChart}
            className="bg-gray-800 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-700 transition-all"
            data-testid="go-to-chart-btn"
          >
            Go to Chart
          </button>
        </div>
      </div>
    </div>
  );
});
