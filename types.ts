export interface CalorieData {
  date: string;
  intake: number;
  expenditure: number;
  basalMetabolism: number;
}

export interface CalorieDataContextType {
  calorieData: Map<string, CalorieData>;
  saveCalorieData: (
    date: string,
    intake: number,
    expenditure: number,
    basalMetabolism: number,
  ) => void;
  getCalorieDataForDate: (date: string) => CalorieData | undefined;
  getLastBasalMetabolism: () => number | undefined;
}
