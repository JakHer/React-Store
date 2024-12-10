import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useFirebase } from '../../../context/FirebaseContext';

export const CartIcon: React.FC = observer(() => {
  const { store } = useFirebase();
  const navigate = useNavigate();
  const [animateCart, setAnimateCart] = useState(false);

  const handleCartClick = () => {
    navigate('/chart');
  };

  const uniqueItemsCount = store.cart.reduce(
    (uniqueProducts: Set<string>, { product }) => {
      uniqueProducts.add(product.id);
      return uniqueProducts;
    },
    new Set<string>()
  ).size;

  useEffect(() => {
    if (uniqueItemsCount > 0) {
      setAnimateCart(true);
      const resetAnimation = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(resetAnimation);
    }
  }, [uniqueItemsCount]);

  return (
    <motion.div
      className="fixed bottom-11 right-4 z-40"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="cart-icon-container"
    >
      <motion.button
        className="relative bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center"
        title="Shopping Cart"
        onClick={handleCartClick}
        animate={{
          scale: animateCart ? 1.2 : 1,
          rotate: animateCart ? 10 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 10,
        }}
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {uniqueItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
            {uniqueItemsCount}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
});
