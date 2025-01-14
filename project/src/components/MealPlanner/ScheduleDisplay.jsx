import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Sun, Moon } from 'lucide-react';

const ScheduleDisplay = ({ schedule, weeks, downloadSchedule, getDayName }) => {
  if (!schedule) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Your {weeks}-Week Meal Schedule
        </CardTitle>
        <Button onClick={downloadSchedule} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {schedule.map((week, weekIndex) => (
            <div key={weekIndex} className="space-y-4">
              <h3 className="font-semibold text-xl">Week {weekIndex + 1}</h3>
              <div className="grid gap-4">
                {week.lunch.map((_, dayIndex) => (
                  <div key={dayIndex} className="space-y-2">
                    <div className="font-medium text-lg">{getDayName(dayIndex)}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-3 bg-blue-50 rounded">
                        <Sun className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium mr-2">Lunch:</span>
                        <span>{week.lunch[dayIndex]}</span>
                      </div>
                      <div className="flex items-center p-3 bg-purple-50 rounded">
                        <Moon className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium mr-2">Dinner:</span>
                        <span>{week.dinner[dayIndex]}</span>
                      </div>
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

export default ScheduleDisplay;
