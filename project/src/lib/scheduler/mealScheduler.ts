import { Meals, WeekMeals, Schedule } from './types';

/**
 * Generates a week's worth of meals while avoiding recent duplicates
 * @param availableMeals Array of all possible meals
 * @param recentMeals Array of recently used meals to avoid repetition
 * @returns Array of meals for the week
 */
const generateMealsForWeek = (
  availableMeals: string[],
  recentMeals: string[]
): string[] => {
  const weekMeals: string[] = [];
  const mealPool = [...availableMeals];

  for (let day = 0; day < 7; day++) {
    // Filter out recently used meals to avoid repetition
    const validMeals = mealPool.filter(meal => !recentMeals.includes(meal));
    
    // Select a meal - either from valid meals or from all meals if no valid options
    const selectedMeal = validMeals.length > 0
      ? validMeals[Math.floor(Math.random() * validMeals.length)]
      : mealPool[Math.floor(Math.random() * mealPool.length)];

    // Add selected meal to week's plan and update tracking arrays
    weekMeals.push(selectedMeal);
    mealPool.splice(mealPool.indexOf(selectedMeal), 1);
    
    // Track recent meals (keep last 14 days)
    recentMeals.push(selectedMeal);
    if (recentMeals.length > 14) recentMeals.shift();
  }

  return weekMeals;
};

/**
 * Validates meal inputs before schedule generation
 * @param meals Object containing lunch and dinner arrays
 * @returns boolean indicating if meals are valid
 */
export const validateMeals = (meals: Meals): boolean => {
  return meals.lunch.length >= 7 && meals.dinner.length >= 7;
};

/**
 * Generates a complete meal schedule for the specified number of weeks
 * @param meals Object containing arrays of lunch and dinner options
 * @param weekCount Number of weeks to generate schedule for
 * @returns Schedule object containing weekly meal plans
 */
export const generateMealSchedule = (meals: Meals, weekCount: number): Schedule => {
  // Validate inputs
  if (!validateMeals(meals)) {
    throw new Error('Insufficient meals: Need at least 7 options for both lunch and dinner');
  }

  const schedule: WeekMeals[] = [];
  const recentLunches: string[] = [];
  const recentDinners: string[] = [];

  // Generate schedule week by week
  for (let week = 0; week < weekCount; week++) {
    const weekMeals: WeekMeals = {
      lunch: generateMealsForWeek([...meals.lunch], recentLunches),
      dinner: generateMealsForWeek([...meals.dinner], recentDinners)
    };
    schedule.push(weekMeals);
  }

  return { weeks: schedule };
};

/**
 * Shuffles an array of meals randomly
 * @param meals Array of meal names to shuffle
 * @returns New array with meals in random order
 */
export const shuffleMeals = (meals: string[]): string[] => {
  const shuffled = [...meals];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};