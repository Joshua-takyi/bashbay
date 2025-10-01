'use client';
import axios, { AxiosInstance } from 'axios';
import { createContext, useContext } from 'react';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL || 'http://localhost:8080/api/v1';

type AppContextType = {
  api: AxiosInstance;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const api = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  return <AppContext.Provider value={{ api }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
