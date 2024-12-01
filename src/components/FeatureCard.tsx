import { motion } from 'framer-motion';
import { FeatureCardProps } from '../types/types';

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  dataTestId,
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-200 ease-in-out transform border border-gray-200"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    data-testid={dataTestId}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);
