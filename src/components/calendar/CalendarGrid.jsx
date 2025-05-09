import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useHabitsContext } from '../../context/HabitsContext';

export function CalendarGrid({ currentDate }) {
  const { habits, dispatch } = useHabitsContext();
  const today = new Date();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const gridDays = Array(firstDayOfMonth).fill(null);

  const handleToggleHabit = (habit, date) => {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    dispatch({
      type: "TOGGLE_HABIT_COMPLETION",
      payload: { habitId: habit.id, monthKey, day: date.getDate() },
    });
  };

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayIndex = date.getDay();

    const dayHabits = habits.filter(habit => {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      return habit.days[dayIndex] && (date >= today || habit.completedDays?.[monthKey]?.includes(day));
    });

    gridDays.push({ date, habits: dayHabits });
  }

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map(day => (
        <div key={day} className="text-center font-medium text-slate-500 py-2">
          {day}
        </div>
      ))}
      {gridDays.map((day, index) => {
        const isPastDay = day && day.date < today;
        const isToday = day && isSameDay(day.date, today);

        return (
          <Card
            key={index}
            className={`p-2 ${
              !day
                ? 'bg-slate-50'
                : isToday
                ? 'bg-blue-50 border-blue-200'
                : isPastDay
                ? 'bg-slate-50/50'
                : ''
            }`}
          >
            {day && (
              <>
                <div className={`text-right text-sm font-medium mb-2 ${isToday ? 'text-blue-600 font-bold' : isPastDay ? 'text-slate-400' : ''}`}>
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.habits.map(habit => {
                    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                    const isCompleted = habit.completedDays?.[monthKey]?.includes(day.date.getDate());

                    return (
                      <div
                        key={habit.id}
                        className={`flex items-center space-x-1 text-xs p-1 rounded ${
                          isCompleted
                            ? 'bg-green-50 hover:bg-green-100'
                            : isPastDay
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                        onClick={() => !isPastDay && handleToggleHabit(habit, day.date)}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: habit.color }} />
                        <span className="truncate">{habit.title}</span>
                        {isCompleted && <CheckCircle className="h-3 w-3 text-green-500 ml-auto" />}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}