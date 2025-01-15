import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Calendar, Utensils, Sun, Moon, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MealPlanner = () => {
  const [meals, setMeals] = useState({ lunch: [], dinner: [] });
  const [newMeal, setNewMeal] = useState('');
  const [mealType, setMealType] = useState('lunch');
  const [weeks, setWeeks] = useState(1);
  const [schedule, setSchedule] = useState(null);

  const addMeal = () => {
    if (newMeal.trim() && !meals[mealType].includes(newMeal.trim())) {
      setMeals({
        ...meals,
        [mealType]: [...meals[mealType], newMeal.trim()]
      });
      setNewMeal('');
    }
  };

  const removeMeal = (index, type) => {
    setMeals({
      ...meals,
      [type]: meals[type].filter((_, i) => i !== index)
    });
  };

  const generateSchedule = () => {
    if (meals.lunch.length < 7 || meals.dinner.length < 7) {
      alert('Please add at least 7 meals for both lunch and dinner to generate a schedule');
      return;
  };

  const getDayName = (index) => {
    // ... (unchanged)
  };

  const downloadSchedulePDF = () => {
    if (!schedule) return;

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Meal Plan Schedule</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              text-align: center;
              color: #333;
            }
            .week {
              margin-bottom: 30px;
            }
            .week-title {
              font-size: 24px;
              margin-bottom: 15px;
              color: #444;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            @media print {
              .week {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <h1>${weeks}-Week Meal Plan</h1>
          ${schedule.map((week, weekIndex) => `
            <div class="week">
              <h2 class="week-title">Week ${weekIndex + 1}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  ${week.lunch.map((_, dayIndex) => `
                    <tr>
                      <td>${getDayName(dayIndex)}</td>
                      <td>${week.lunch[dayIndex]}</td>
                      <td>${week.dinner[dayIndex]}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal-schedule.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ... (unchanged) */}
    </div>
  );
};

export default MealPlanner;
