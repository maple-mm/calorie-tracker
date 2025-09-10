import { useCallback, useEffect, useState } from 'react';
import { CalorieData } from '../types';

const STORAGE_KEY = 'calorieTrackerData';
const BASAL_METABOLISM_KEY = 'lastBasalMetabolism';

export const useCalorieData = () => {
  const [calorieData, setCalorieData] = useState<Map<string, CalorieData>>(
    new Map(),
  );

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCalorieData(new Map(parsedData));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
      setCalorieData(new Map());
    }
  }, []);

  const saveDataToLocalStorage = (data: Map<string, CalorieData>) => {
    try {
      const dataArray = Array.from(data.entries());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    } catch (error) {
      console.error('Failed to save data to localStorage', error);
    }
  };

  const saveCalorieData = useCallback(
    (
      date: string,
      intake: number,
      expenditure: number,
      basalMetabolism: number,
    ) => {
      setCalorieData((prevData) => {
        const newData = new Map(prevData);
        newData.set(date, { date, intake, expenditure, basalMetabolism });
        saveDataToLocalStorage(newData);
        return newData;
      });

      if (basalMetabolism > 0) {
        try {
          localStorage.setItem(BASAL_METABOLISM_KEY, String(basalMetabolism));
        } catch (error) {
          console.error(
            'Failed to save last basal metabolism to localStorage',
            error,
          );
        }
      }
    },
    [],
  );

  const getCalorieDataForDate = useCallback(
    (date: string): CalorieData | undefined => {
      return calorieData.get(date);
    },
    [calorieData],
  );

  const getLastBasalMetabolism = useCallback((): number | undefined => {
    try {
      const storedValue = localStorage.getItem(BASAL_METABOLISM_KEY);
      if (storedValue) {
        const num = parseInt(storedValue, 10);
        return isNaN(num) ? undefined : num;
      }
    } catch (error) {
      console.error(
        'Failed to load last basal metabolism from localStorage',
        error,
      );
    }
    return undefined;
  }, []);

  return {
    calorieData,
    saveCalorieData,
    getCalorieDataForDate,
    getLastBasalMetabolism,
  };
};
