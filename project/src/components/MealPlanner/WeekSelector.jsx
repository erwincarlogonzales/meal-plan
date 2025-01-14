import React from 'react';
import { Button } from '@/components/ui/button';

const WeekSelector = ({ weeks, setWeeks }) => {
  return (
    <div className="flex items-center gap-4">
      <span>Weeks:</span>
      {[1, 2, 3, 4].map((num) => (
        <Button
          key={num}
          variant={weeks === num ? 'default' : 'outline'}
          onClick={() => setWeeks(num)}
          className="w-10 h-10"
        >
          {num}
        </Button>
      ))}
    </div>
  );
};

export default WeekSelector;
