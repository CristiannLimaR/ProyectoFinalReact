import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useHabitsContext } from '../../context/HabitsContext';
import { useState, useEffect } from 'react';

export function HabitDayTracker({ habitId, days }) {
  const { habits, dispatch } = useHabitsContext();
  const habit = habits.find(h => h.id === habitId);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  
  const getDayName = (index) => {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return days[index];
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const updateDates = () => {
    const now = new Date();
    setCurrentDate(now);
    
    const currentDay = now.getDay();
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
    
    const newDates = Array(7).fill().map((_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - daysFromMonday + i);
      return date;
    });
    
    setDates(newDates);
  };
  
  useEffect(() => {
    updateDates();
    const interval = setInterval(updateDates, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleToggleCompletion = (date, isScheduled) => {
    if (!isScheduled) return;
    
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const day = date.getDate();
    
    dispatch({
      type: "TOGGLE_HABIT_COMPLETION",
      payload: {
        habitId,
        monthKey,
        day
      }
    });
  };

  return (
    <div className="flex justify-between mt-2">
      {days.map((scheduled, index) => {
        const date = dates[index];
        if (!date) return null;
        
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const isCompleted = habit?.completedDays?.[monthKey]?.includes(date.getDate());
        const isToday = isSameDay(date, currentDate);
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs text-slate-500 mb-1">{getDayName(index)}</div>
            <div className={`text-xs mb-1 ${
              isToday 
                ? 'text-blue-600 font-bold' 
                : 'text-slate-400'
            }`}>
              {date.getDate()}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-9 h-9 rounded-full ${
                isCompleted 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700' 
                  : isToday
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700'
                    : scheduled 
                      ? 'bg-slate-100 text-slate-400 hover:bg-slate-200' 
                      : 'opacity-30 cursor-not-allowed'
              }`}
              onClick={() => handleToggleCompletion(date, scheduled)}
              disabled={!scheduled}
            >
              {isCompleted && <CheckCircle size={16} />}
            </Button>
          </div>
        );
      })}
    </div>
  );
}