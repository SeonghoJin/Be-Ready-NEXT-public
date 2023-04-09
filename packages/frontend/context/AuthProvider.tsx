import { User } from '@./common';
import { createContext, PropsWithChildren, useContext } from 'react';

const defaultValue: User | null = null;

export const authContenxt = createContext(defaultValue);

export const useUser = () => {
  return useContext(authContenxt);
};

export const AuthProvider = ({
  children,
  user,
}: PropsWithChildren<{ user: User }>) => {
  return (
    <authContenxt.Provider value={user ?? null}>
      {children}
    </authContenxt.Provider>
  );
};
