import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { ProductCard } from '../components/ProductCard';
import { useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', description: 'Amazing product 1', price: 25.99 },
  { id: 2, name: 'Product 2', description: 'Amazing product 2', price: 15.99 },
  { id: 3, name: 'Product 3', description: 'Amazing product 3', price: 35.99 },
];

export const Store: React.FC = () => {
  const productCards = useMemo(
    () =>
      products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      )),
    [products]
  );

  return (
    <div data-testid="products-container">
      <AnimatedSection
        className="text-center py-10"
        data-testid="products-header"
      >
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          data-testid="products-heading"
        >
          Our Products
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          data-testid="products-description"
        >
          Browse our curated selection of top-quality products.
        </motion.p>
      </AnimatedSection>

      <AnimatedSection className="py-10" data-testid="products-list">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16">
          {productCards}
        </div>
      </AnimatedSection>
    </div>
  );
};
