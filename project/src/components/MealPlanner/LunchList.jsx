import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Sun } from 'lucide-react';

const LunchList = ({ meals, removeMeal }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sun className="w-4 h-4" />
          Lunch Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {meals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <span>{meal}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeMeal(index, 'lunch')}
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

export default LunchList;
