# meal-plan
 meal plan app

# App Project Structure

project/
├── public/
│   ├── index.html
│   └── styles.css
│
├── src/
│   ├── components/
│   │   ├── MealPlanner/            # Main MealPlanner module
│   │   │   ├── MealPlanner.jsx     # Combines all MealPlanner components
│   │   │   ├── MealInput.jsx       # Handles meal type selection and adding meals
│   │   │   ├── MealList.jsx        # Displays and manages meal lists
│   │   │   ├── WeekSelector.jsx    # Allows week selection
│   │   │   ├── ScheduleDisplay.jsx # Displays generated schedule
│   │   │   └── index.js            # Aggregates MealPlanner components
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.jsx          # Button component
│   │       ├── Card.jsx            # Card component
│   │       ├── Input.jsx           # Input component
│   │       └── Select.jsx          # Select dropdown component
│   │
│   ├── lib/
│   │   ├── scheduler/
│   │   │   ├── index.js            # Aggregates scheduler logic
│   │   │   └── mealScheduler.js    # Core schedule generation logic
│   │   └── utils.js                # Utility functions (e.g., getDayName)
│   │
│   ├── pages/                      # Entry points for Vercel deployment
│   │   ├── index.jsx               # Renders <MealPlanner />
│   │   └── api/                    # API routes (if needed for serverless logic)
│   │       ├── meals.js            # API for meal-related logic
│   │       └── schedule.js         # API for schedule-related logic
│   │
│   ├── App.js                      # Main app component
│   └── index.js                    # App initialization
│
├── package.json                    # Project dependencies and scripts
└── node_modules/                   # Installed dependencies
