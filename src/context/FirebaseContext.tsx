import React, { createContext, useContext } from 'react';
import { db } from '../firebase';
import store from '../store/Store';

const FirebaseContext = createContext({ db, store });

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FirebaseContext.Provider value={{ db, store }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
