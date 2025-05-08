import { createContext, useReducer, useContext } from "react";
import habitsReducer from "../reducers/habitsReducer";
import { initialHabits } from "../components/data/habitData";

const HabitsContext = createContext();

const loadHabits = () => {
  try {
    const savedHabits = localStorage.getItem('habits');
    if (!savedHabits) {
      localStorage.setItem('habits', JSON.stringify(initialHabits));
      return initialHabits;
    }
    const parsedHabits = JSON.parse(savedHabits);
    return parsedHabits ? parsedHabits : initialHabits;
  } catch (error) {
    console.error('Error al cargar los hábitos:', error);
    localStorage.setItem('habits', JSON.stringify(initialHabits));
    return initialHabits;
  }
};

export const HabitsProvider = ({ children }) => {
  const [habits, dispatch] = useReducer(habitsReducer, loadHabits());

  return (
    <HabitsContext.Provider value={{ habits, dispatch }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => useContext(HabitsContext);
