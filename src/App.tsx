import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { AnimatePresence, motion } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col" data-testid="app-container">
      <Header />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="min-h-screen"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          key={location.pathname}
          data-testid="page-transition"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
