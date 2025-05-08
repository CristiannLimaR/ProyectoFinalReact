import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  // Obtener el día de la semana en que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const gridDays = [];

  // Agregar espacios vacíos para los días antes del primer día del mes
  for (let i = 0; i < firstDayOfMonth; i++) {
    gridDays.push(null);
  }

  // Función para marcar/desmarcar un hábito como completado
  const handleToggleHabit = (habit, date) => {
    // Crear una clave única para el mes (formato: YYYY-MM)
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const day = date.getDate();
    
    dispatch({
      type: "TOGGLE_HABIT_COMPLETION",
      payload: {
        habitId: habit.id,
        monthKey,
        day
      }
    });
  };

  // Generar los días del mes y sus hábitos correspondientes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayIndex = date.getDay();

    // Filtrar los hábitos para este día específico
    const dayHabits = habits.filter(habit => {
      const isScheduled = habit.days[dayIndex]; // Verificar si el hábito está programado para este día
      
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      const isCompleted = habit.completedDays?.[monthKey]?.includes(day); // Verificar si está completado
      const isTodayOrFuture = date >= today; // Verificar si es hoy o un día futuro
      
      // Mostrar el hábito si está programado y es hoy/futuro o ya está completado
      return isScheduled && (isTodayOrFuture || isCompleted);
    });

    // Agregar el día y sus hábitos al grid
    gridDays.push({
      date,
      habits: dayHabits
    });
  }

  // Función auxiliar para comparar si dos fechas son el mismo día
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

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
                ? 'bg-slate-50' // Día vacío
                : isToday 
                  ? 'bg-blue-50 border-blue-200' // Día actual
                  : isPastDay 
                    ? 'bg-slate-50/50' // Día pasado
                    : ''
            }`}
          >
            {day && (
              <>
                <div className={`text-right text-sm font-medium mb-2 ${
                  isToday 
                    ? 'text-blue-600 font-bold' // Resaltar el día actual
                    : isPastDay 
                      ? 'text-slate-400' // Días pasados en gris
                      : ''
                }`}>
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.habits.map(habit => {
                    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                    const isCompleted = habit.completedDays?.[monthKey]?.includes(day.date.getDate());
                    
                    return (
                      <div
                        key={habit.id}
                        className={`flex items-center space-x-1 text-xs p-1 rounded transition-colors ${
                          isCompleted 
                            ? 'bg-green-50 hover:bg-green-100' // Hábito completado
                            : isPastDay
                              ? 'opacity-40 cursor-not-allowed' // Día pasado
                              : isToday
                                ? 'hover:bg-blue-100 cursor-pointer' // Día actual
                                : 'hover:bg-slate-50 cursor-pointer' // Día futuro
                        }`}
                        onClick={() => !isPastDay && handleToggleHabit(habit, day.date)}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: habit.color }}
                        />
                        <span className="truncate">{habit.title}</span>
                        {isCompleted && (
                          <CheckCircle className="h-3 w-3 text-green-500 ml-auto flex-shrink-0" />
                        )}
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