import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Sun, Moon } from 'lucide-react';

const MealInput = ({ mealType, newMeal, setMealType, setNewMeal, addMeal }) => {
  return (
    <div className="flex gap-2">
      <Select value={mealType} onValueChange={setMealType}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Meal Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lunch">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Lunch
            </div>
          </SelectItem>
          <SelectItem value="dinner">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dinner
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={newMeal}
        onChange={(e) => setNewMeal(e.target.value)}
        placeholder="Enter a meal name"
        onKeyPress={(e) => e.key === 'Enter' && addMeal()}
        className="flex-1"
      />
      <Button onClick={addMeal} className="flex items-center gap-2">
        <PlusCircle className="w-4 h-4" />
        Add Meal
      </Button>
    </div>
  );
};

export default MealInput;
