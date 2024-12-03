import React from 'react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import store from '../store/Store';
import { Product } from '../types/types';

const ProductCard: React.FC = observer(() => {
  const handleAddToCart = (product: Product) => {
    store.addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16">
      {store.products.map((product) => {
        const existingItem = store.cart.find(
          (item) => item.product.id === product.id
        );

        return (
          <motion.div
            key={product.id}
            className="bg-white shadow rounded-lg p-4 cursor-pointer w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.01,
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
            }}
            data-testid={`product-card-${product.name}`}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-yellow-500 text-lg font-bold mt-4">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className={`bg-gray-800 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-700 transition-all mt-4 ${
                  existingItem ? 'bg-gray-400 cursor-not-allowed' : ''
                }`}
                disabled={!!existingItem}
                data-testid={`add-to-cart-button-${product.id}`}
              >
                {existingItem ? 'Already in Cart' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

export default ProductCard;
