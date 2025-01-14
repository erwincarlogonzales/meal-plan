import { Schedule } from './scheduler/types';

/**
 * Converts day index to day name
 */
export const getDayName = (index: number): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[index];
};

/**
 * Generates HTML content for schedule download
 */
export const generateScheduleHTML = (schedule: Schedule, weeks: number): string => {
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
          .week {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .week-title {
            font-size: 24px;
            margin-bottom: 15px;
            color: #444;
          }
          .day {
            margin-bottom: 20px;
          }
          .day-title {
            font-size: 18px;
            margin-bottom: 10px;
            color: #666;
          }
          .meal {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 4px;
          }
          .lunch {
            background-color: #e6f3ff;
          }
          .dinner {
            background-color: #f5e6ff;
          }
        </style>
      </head>
      <body>
        <h1>${weeks}-Week Meal Plan</h1>
        ${schedule.weeks.map((week, weekIndex) => `
          <div class="week">
            <h2 class="week-title">Week ${weekIndex + 1}</h2>
            ${week.lunch.map((_, dayIndex) => `
              <div class="day">
                <h3 class="day-title">${getDayName(dayIndex)}</h3>
                <div class="meal lunch">
                  <strong>Lunch:</strong> ${week.lunch[dayIndex]}
                </div>
                <div class="meal dinner">
                  <strong>Dinner:</strong> ${week.dinner[dayIndex]}
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
    </html>
  `;

  return content;
};

/**
 * Downloads schedule as HTML file
 */
export const downloadSchedule = (schedule: Schedule, weeks: number): void => {
  const content = generateScheduleHTML(schedule, weeks);
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