// lib/scheduler/mealScheduler.js
export const generateSchedule = (meals, weeks) => {
  if (meals.lunch.length < 7 || meals.dinner.length < 7) {
    alert('Please add at least 7 meals for both lunch and dinner to generate a schedule');
    return null;
  }

  const schedule = [];
  const recentLunches = [];
  const recentDinners = [];

  for (let week = 0; week < weeks; week++) {
    const weekMeals = {
      lunch: [],
      dinner: [],
    };

    const availableLunches = [...meals.lunch];
    const availableDinners = [...meals.dinner];

    for (let day = 0; day < 7; day++) {
      // Handle lunch
      const validLunches = availableLunches.filter((meal) => !recentLunches.includes(meal));
      let lunchMeal;
      if (validLunches.length === 0) {
        const randomIndex = Math.floor(Math.random() * availableLunches.length);
        lunchMeal = availableLunches[randomIndex];
        availableLunches.splice(randomIndex, 1);
      } else {
        const randomIndex = Math.floor(Math.random() * validLunches.length);
        lunchMeal = validLunches[randomIndex];
        availableLunches.splice(availableLunches.indexOf(lunchMeal), 1);
      }
      weekMeals.lunch.push(lunchMeal);
      recentLunches.push(lunchMeal);
      if (recentLunches.length > 14) recentLunches.shift();

      // Handle dinner
      const validDinners = availableDinners.filter((meal) => !recentDinners.includes(meal));
      let dinnerMeal;
      if (validDinners.length === 0) {
        const randomIndex = Math.floor(Math.random() * availableDinners.length);
        dinnerMeal = availableDinners[randomIndex];
        availableDinners.splice(randomIndex, 1);
      } else {
        const randomIndex = Math.floor(Math.random() * validDinners.length);
        dinnerMeal = validDinners[randomIndex];
        availableDinners.splice(availableDinners.indexOf(dinnerMeal), 1);
      }
      weekMeals.dinner.push(dinnerMeal);
      recentDinners.push(dinnerMeal);
      if (recentDinners.length > 14) recentDinners.shift();
    }
    schedule.push(weekMeals);
  }

  return schedule;
};
