import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useFirebase } from '../../../context/FirebaseContext';
import Title from '../../common/Title/Title';
import Paragraph from '../../common/Paragraph/Paragraph';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import EmptyState from '../../common/EmptyState/EmptyState';
import ProductError from '../../common/ProductError/ProductError';
import { Product } from './ProductCard.types';

const ProductCard: React.FC = observer(() => {
  const { store } = useFirebase();

  const handleAddToCart = (product: Product) => {
    store.addToCart(product);
  };

  useEffect(() => {
    store.fetchProducts();
  }, [store]);

  if (store.isLoading) {
    return <Loader data-testid="loader" />;
  }

  if (store.products.length === 0) {
    return <EmptyState data-testid="empty-state" />;
  }

  if (store.productError) {
    return (
      <ProductError
        errorMessage={store.productError}
        data-testid="product-error-container"
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16"
      data-testid="product-cards-container"
    >
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
            data-testid={`product-card-${product.id}`}
          >
            <div>
              <Title
                title={product.name}
                dataTestId={`product-title-${product.name}`}
              />
              <Paragraph
                text={product.description}
                dataTestId={`product-paragraph-${product.description}`}
              />
              <Paragraph
                text={`$${product.price.toFixed(2)}`}
                className="text-yellow-500 text-lg font-bold mt-4"
                dataTestId={`product-price-${product.price}`}
              />
              <Button
                text={existingItem ? 'Already in Cart' : 'Add to Cart'}
                className={`text-white py-2 px-4 mt-4 ${
                  existingItem
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                dataTestId={`add-to-cart-button-${product.id}`}
                onClick={() => handleAddToCart(product)}
                disabled={!!existingItem}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

export default ProductCard;
