import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/modules/Header/Header';

import { Store } from './pages/Store/Store';
import { AnimatePresence, motion } from 'framer-motion';
import { NotFound } from './pages/NotFound/NotFound';
import React from 'react';
import ChartPage from './pages/Chart/ChartPage';
import { Home } from './pages/Home/Home';
import { CartIcon } from './components/modules/CartIcon/CartIcon';
import { Modal } from './components/modules/Modal/Modal';
import Footer from './components/modules/Footer/Footer';
import { FirebaseProvider } from './context/FirebaseContext';

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
    <FirebaseProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Modal />
        {shouldShowCartIcon && <CartIcon />}
        <div className="flex-grow">
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              key={location.pathname}
              className="min-h-full"
              data-testid="page-transition"
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/store"
                  element={<Store />}
                />
                <Route
                  path="/chart"
                  element={<ChartPage />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </FirebaseProvider>
  );
};

export default App;
