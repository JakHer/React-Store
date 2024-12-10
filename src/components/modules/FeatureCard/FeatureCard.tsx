import { motion } from 'framer-motion';
import Title from '../../common/Title/Title';
import Paragraph from '../../common/Paragraph/Paragraph';
import { FeatureCardProps } from './FeatureCard.types';

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
    <Title title={title} />
    <Paragraph text={description} />
  </motion.div>
);
