import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Meals } from '@/lib/scheduler/types';

interface WeekSelectorProps {
  weeks: number;
  onWeekChange: (weeks: number) => void;
  onGenerate: () => void;
  meals: Meals;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  weeks,
  onWeekChange,
  onGenerate,
  meals
}) => {
  const isDisabled = meals.lunch.length < 7 || meals.dinner.length < 7;

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span>Weeks:</span>
        {[1, 2, 3, 4].map((num) => (
          <Button
            key={num}
            variant={weeks === num ? "default" : "outline"}
            onClick={() => onWeekChange(num)}
            className="w-10 h-10"
          >
            {num}
          </Button>
        ))}
      </div>
      
      <Button
        onClick={onGenerate}
        className="ml-auto flex items-center gap-2"
        disabled={isDisabled}
      >
        <Calendar className="w-4 h-4" />
        Generate Schedule
      </Button>
    </div>
  );
};

export default WeekSelector;