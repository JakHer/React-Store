import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/common/AnimatedSection/AnimatedSection';
import { FeatureCard } from '../components/modules/FeatureCard/FeatureCard';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="home-container">
      <AnimatedSection
        className="text-center bg-white"
        data-testid="hero-section"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          data-testid="hero-heading"
        >
          Welcome to My React Store
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          data-testid="hero-description"
        >
          Your one-stop shop for all things awesome. Discover products you'll
          love!
        </motion.p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          data-testid="shop-now-button-container"
        >
          <Link
            to="/store"
            className="bg-gray-800 text-white py-3 px-6 rounded-full text-lg hover:bg-gray-700 transition-all duration-200 ease-in-out"
            data-testid="shop-now-button"
          >
            Shop Now
          </Link>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection
        className="bg-white"
        delay={0.5}
        data-testid="features-section"
      >
        <h2
          className="text-3xl font-semibold text-center text-gray-800 mb-10"
          data-testid="features-heading"
        >
          Our Features
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          data-testid="features-list"
        >
          <FeatureCard
            title="Fast Shipping"
            description="Get your products delivered quickly and safely."
            dataTestId="feature-1"
          />
          <FeatureCard
            title="Secure Payments"
            description="Our payment process is 100% secure and encrypted."
            dataTestId="feature-2"
          />
          <FeatureCard
            title="Quality Products"
            description="We offer top-notch products handpicked just for you."
            dataTestId="feature-3"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="bg-gray-100 text-center"
        delay={0.7}
        data-testid="cta-section"
      >
        <h2
          className="text-3xl font-semibold text-gray-800 mb-6"
          data-testid="cta-heading"
        >
          Ready to Shop?
        </h2>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          data-testid="cta-button-container"
        >
          <Link
            to="/store"
            className="bg-gray-800 text-white py-3 px-6 rounded-full text-lg hover:bg-gray-700 transition-all duration-200 ease-in-out"
            data-testid="cta-button"
          >
            Browse Our Store
          </Link>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};
