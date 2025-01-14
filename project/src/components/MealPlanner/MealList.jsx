import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Sun, Moon } from 'lucide-react';
import { MealType } from '@/lib/scheduler/types';

interface MealListProps {
  type: MealType;
  meals: string[];
  onRemoveMeal: (index: number, type: MealType) => void;
}

export const MealList: React.FC<MealListProps> = ({ type, meals, onRemoveMeal }) => {
  const Icon = type === 'lunch' ? Sun : Moon;
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Options`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {meals.map((meal, index) => (
            <div 
              key={`${type}-${index}`} 
              className="flex items-center justify-between p-2 bg-gray-100 rounded"
            >
              <span>{meal}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveMeal(index, type)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealList;