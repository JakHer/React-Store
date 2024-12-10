import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Title from '../../common/Title/Title';
import Paragraph from '../../common/Paragraph/Paragraph';
import Button from '../../common/Button/Button';
import { useFirebase } from '../../../context/FirebaseContext';

export const Modal: React.FC = observer(() => {
  const { store } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const lastAddedItem =
    store.cart.length > 0 ? store.cart[store.cart.length - 1] : null;

  const closeModal = () => {
    store.hideModal();
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (store.cart.length === 1 && location.pathname === '/store') {
      store.hasModalShown = true;
    }
  }, [store.cart.length, location.pathname]);

  if (!lastAddedItem || !store.hasModalShown || location.pathname !== '/store')
    return null;

  const { product, quantity } = lastAddedItem;

  const navigateToChart = () => {
    store.hideModal();
    navigate('/chart');
  };

  return (
    <AnimatePresence>
      {store.hasModalShown && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleOverlayClick}
          data-testid="modal-overlay"
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="modal-container"
          >
            <Title
              title="Item Added to Cart"
              dataTestId="modal-title"
            />
            <div
              className="mb-6"
              data-testid="modal-details"
            >
              <Title
                title={product.name}
                dataTestId="product-name"
              />
              <Paragraph
                text={product.description}
                dataTestId="product-descripton"
              />
              <Paragraph
                text={`$${product.price.toFixed(2)} x ${quantity}`}
                className="text-yellow-500 font-bold"
                dataTestId="product-price"
              />
              <Paragraph
                text={`Subtotal: $${(product.price * quantity).toFixed(2)}`}
                className="font-bold mt-2"
                dataTestId="subtotal"
              />
            </div>
            <Paragraph
              className="mb-4"
              dataTestId='"modal-message"'
              text=" Would you like to continue shopping or go to the store?"
            />
            <div className="flex justify-between">
              <Button
                text="Continue Shopping"
                dataTestId="continue-shopping-btn"
                onClick={closeModal}
              />
              <Button
                text="Go to Chart"
                className="bg-gray-800 text-white"
                dataTestId="go-to-chart-btn"
                onClick={navigateToChart}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
