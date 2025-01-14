import React, { useState } from 'react';
import LunchList from './MealPlanner/LunchList';
import DinnerList from './MealPlanner/DinnerList';
import WeekSelector from './MealPlanner/WeekSelector';
import ScheduleDisplay from './MealPlanner/ScheduleDisplay';
import { getDayName } from '@/lib/utils';
import { generateSchedule } from '@/lib/scheduler/mealScheduler';
import { downloadPDF } from '@/lib/utils/downloadPDF';

const MealPlanner = () => {
  const [meals, setMeals] = useState({ lunch: [], dinner: [] });
  const [weeks, setWeeks] = useState(1);
  const [schedule, setSchedule] = useState(null);

  const handleGenerateSchedule = () => {
    const newSchedule = generateSchedule(meals, weeks);
    if (newSchedule) {
      setSchedule(newSchedule);
    }
  };

  const removeMeal = (index, type) => {
    setMeals({
      ...meals,
      [type]: meals[type].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="container">
      {/* Meal Lists */}
      <div className="grid">
        <LunchList meals={meals.lunch} removeMeal={removeMeal} />
        <DinnerList meals={meals.dinner} removeMeal={removeMeal} />
      </div>

      {/* Week Selector */}
      <div className="card flex">
        <WeekSelector weeks={weeks} setWeeks={setWeeks} />
      </div>

      {/* Schedule Display */}
      {schedule && (
        <ScheduleDisplay
          schedule={schedule}
          weeks={weeks}
          downloadSchedule={() => downloadPDF(schedule, weeks, getDayName)}
          getDayName={getDayName}
        />
      )}

      {/* Generate Schedule Button */}
      <div className="flex-center">
        <button
          onClick={handleGenerateSchedule}
          className="primary-btn"
          disabled={meals.lunch.length < 7 || meals.dinner.length < 7}
        >
          Generate Schedule
        </button>
      </div>
    </div>
  );
};

export default MealPlanner;
