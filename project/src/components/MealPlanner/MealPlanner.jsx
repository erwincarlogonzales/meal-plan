import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { MealInput } from './MealInput';
import { MealList } from './MealList';
import { WeekSelector } from './WeekSelector';
import { ScheduleDisplay } from './ScheduleDisplay';
import { MealType, Meals, Schedule } from '@/lib/scheduler/types';
import { generateMealSchedule } from '@/lib/scheduler/mealScheduler';

export const MealPlanner: React.FC = () => {
  const [meals, setMeals] = useState<Meals>({ lunch: [], dinner: [] });
  const [weeks, setWeeks] = useState<number>(1);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const handleAddMeal = (type: MealType, newMeal: string) => {
    if (newMeal.trim() && !meals[type].includes(newMeal.trim())) {
      setMeals(prev => ({
        ...prev,
        [type]: [...prev[type], newMeal.trim()]
      }));
    }
  };

  const handleRemoveMeal = (index: number, type: MealType) => {
    setMeals(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleGenerateSchedule = () => {
    if (meals.lunch.length < 7 || meals.dinner.length < 7) {
      alert('Please add at least 7 meals for both lunch and dinner');
      return;
    }
    const newSchedule = generateMealSchedule(meals, weeks);
    setSchedule(newSchedule);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-6 h-6" />
            Meal Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MealInput onAddMeal={handleAddMeal} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MealList
                type="lunch"
                meals={meals.lunch}
                onRemoveMeal={handleRemoveMeal}
              />
              <MealList
                type="dinner"
                meals={meals.dinner}
                onRemoveMeal={handleRemoveMeal}
              />
            </div>

            <WeekSelector
              weeks={weeks}
              onWeekChange={setWeeks}
              onGenerate={handleGenerateSchedule}
              meals={meals}
            />
          </div>
        </CardContent>
      </Card>

      {schedule && <ScheduleDisplay schedule={schedule} weeks={weeks} />}
    </div>
  );
};

export default MealPlanner;