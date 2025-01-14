import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Sun, Moon } from 'lucide-react';
import { Schedule } from '@/lib/scheduler/types';
import { getDayName, downloadSchedule } from '@/lib/utils';

interface ScheduleDisplayProps {
  schedule: Schedule;
  weeks: number;
}

export const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ schedule, weeks }) => {
  if (!schedule) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Your {weeks}-Week Meal Schedule
        </CardTitle>
        <Button 
          onClick={() => downloadSchedule(schedule, weeks)} 
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {schedule.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="space-y-4">
              <h3 className="font-semibold text-xl">Week {weekIndex + 1}</h3>
              <div className="grid gap-4">
                {week.lunch.map((_, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="font-medium text-lg">
                      {getDayName(dayIndex)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MealDisplay
                        type="lunch"
                        meal={week.lunch[dayIndex]}
                        Icon={Sun}
                        bgColor="blue"
                      />
                      <MealDisplay
                        type="dinner"
                        meal={week.dinner[dayIndex]}
                        Icon={Moon}
                        bgColor="purple"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for displaying individual meals
interface MealDisplayProps {
  type: string;
  meal: string;
  Icon: React.FC<any>;
  bgColor: 'blue' | 'purple';
}

const MealDisplay: React.FC<MealDisplayProps> = ({ type, meal, Icon, bgColor }) => (
  <div className={`flex items-center p-3 ${bgColor === 'blue' ? 'bg-blue-50' : 'bg-purple-50'} rounded`}>
    <Icon className={`w-4 h-4 mr-2 ${bgColor === 'blue' ? 'text-blue-500' : 'text-purple-500'}`} />
    <span className="font-medium mr-2">{type.charAt(0).toUpperCase() + type.slice(1)}:</span>
    <span>{meal}</span>
  </div>
);

export default ScheduleDisplay;