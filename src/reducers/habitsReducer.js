// Función para guardar los hábitos en localStorage
const saveHabits = (habits) => {
  try {
    localStorage.setItem('habits', JSON.stringify(habits));
  } catch (error) {
    console.error('Error al guardar los hábitos:', error);
  }
};

const habitsReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case "ADD_HABIT": {
      const newHabit = {
        ...action.payload,
        id: Date.now(),
        streak: action.payload.streak || 0,
        days: action.payload.days || Array(7).fill(false),
        completedDays: action.payload.completedDays || {}
      };
      newState = [...state, newHabit];
      break;
    }

    case "UPDATE_HABIT": {
      newState = state.map(habit =>
        habit.id === action.payload.id ? { ...habit, ...action.payload.data } : habit
      );
      break;
    }

    case "DELETE_HABIT": {
      newState = state.filter(habit => habit.id !== action.payload);
      break;
    }

    case "TOGGLE_HABIT_COMPLETION": {
      newState = state.map(habit => {
        if (habit.id === action.payload.habitId) {
          const completedDays = { ...habit.completedDays };
          if (!completedDays[action.payload.monthKey]) {
            completedDays[action.payload.monthKey] = [];
          }

          const dayIndex = completedDays[action.payload.monthKey].indexOf(action.payload.day);
          if (dayIndex === -1) {
            completedDays[action.payload.monthKey] = [...completedDays[action.payload.monthKey], action.payload.day];
            return { ...habit, completedDays, streak: habit.streak + 1 };
          } else {
            completedDays[action.payload.monthKey] = completedDays[action.payload.monthKey].filter(d => d !== action.payload.day);
            return { ...habit, completedDays, streak: Math.max(0, habit.streak - 1) };
          }
        }
        return habit;
      });
      break;
    }

    default:
      return state;
  }

  saveHabits(newState);
  return newState;
};

export default habitsReducer;
