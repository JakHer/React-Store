import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/modules/Header/Header';

import { Store } from './pages/Store';
import { AnimatePresence, motion } from 'framer-motion';
import { NotFound } from './pages/NotFound';
import React from 'react';
import ChartPage from './pages/ChartPage';
import { Home } from './pages/Home';
import { CartIcon } from './components/modules/CartIcon/CartIcon';
import { Modal } from './components/modules/Modal/Modal';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

const App: React.FC = () => {
  const location = useLocation();

  const shouldShowCartIcon = location.pathname !== '/chart';

  return (
    <div className="flex flex-col" data-testid="app-container">
      <Header />
      <Modal />
      {shouldShowCartIcon && <CartIcon />}
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
            <Route path="/chart" element={<ChartPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
