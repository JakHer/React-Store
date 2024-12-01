import { motion } from 'framer-motion';
import { ProductCardProps } from '../types/types';

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
}) => {
  return (
    <motion.div
      className="bg-white shadow rounded-lg p-4 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.01,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      }}
      data-testid={`product-card-${name}`}
    >
      <div>
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-yellow-500 text-lg font-bold mt-4">
          ${price.toFixed(2)}
        </p>
        <button className="bg-gray-800 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-700 transition-all mt-4">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};
