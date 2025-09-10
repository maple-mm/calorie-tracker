import React, { createContext, ReactNode, useContext } from 'react';
import { useCalorieData } from '../hooks/useCalorieData';
import { CalorieDataContextType } from '../types';

const CalorieDataContext = createContext<CalorieDataContextType | undefined>(
  undefined,
);

export const CalorieDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const calorieDataHook = useCalorieData();

  return (
    <CalorieDataContext.Provider value={calorieDataHook}>
      {children}
    </CalorieDataContext.Provider>
  );
};

export const useCalorie = (): CalorieDataContextType => {
  const context = useContext(CalorieDataContext);
  if (!context) {
    throw new Error('useCalorie must be used within a CalorieDataProvider');
  }
  return context;
};
