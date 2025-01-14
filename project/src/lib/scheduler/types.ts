export type MealType = 'lunch' | 'dinner';

export interface Meals {
  lunch: string[];
  dinner: string[];
}

export interface WeekMeals {
  lunch: string[];
  dinner: string[];
}

export interface Schedule {
  weeks: WeekMeals[];
}

export interface MealPlannerState {
  meals: Meals;
  schedule: Schedule | null;
  weeks: number;
}