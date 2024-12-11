import { motion } from 'framer-motion';
import { AnimatedSection } from '../../components/common/AnimatedSection/AnimatedSection';
import ProductCard from '../../components/modules/ProductCard/ProductCard';
import { Modal } from '../../components/modules/Modal/Modal';

export const Store: React.FC = () => {
  return (
    <div data-testid="products-container">
      <Modal />
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

      <AnimatedSection
        className="py-10"
        data-testid="products-list"
      >
        <ProductCard />
      </AnimatedSection>
    </div>
  );
};
