import { motion } from 'framer-motion';
import { AnimatedSectionProps } from '../types/types';

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  ...props
}) => (
  <motion.section
    className={`py-20 px-6 md:px-12 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    {...props}
  >
    {children}
  </motion.section>
);
