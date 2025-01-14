import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Sun, Moon } from 'lucide-react';
import { MealType } from '@/lib/scheduler/types';

interface MealInputProps {
  onAddMeal: (type: MealType, meal: string) => void;
}

export const MealInput: React.FC<MealInputProps> = ({ onAddMeal }) => {
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [newMeal, setNewMeal] = useState('');

  const handleAddMeal = () => {
    if (newMeal.trim()) {
      onAddMeal(mealType, newMeal.trim());
      setNewMeal('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddMeal();
    }
  };

  return (
    <div className="flex gap-2">
      <Select value={mealType} onValueChange={(value: MealType) => setMealType(value)}>
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
        onKeyPress={handleKeyPress}
        placeholder="Enter a meal name"
        className="flex-1"
      />
      
      <Button onClick={handleAddMeal} className="flex items-center gap-2">
        <PlusCircle className="w-4 h-4" />
        Add Meal
      </Button>
    </div>
  );
};

export default MealInput;