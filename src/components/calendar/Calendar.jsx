import { useState } from 'react';
import { useHabitsContext } from '../../context/HabitsContext';

const Calendar = () => {
  const { habits, dispatch } = useHabitsContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleHabitToggle = (habitId, day) => {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    dispatch({
      type: 'TOGGLE_HABIT_COMPLETION',
      payload: {
        habitId,
        monthKey,
        day
      }
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Ajustar el primer día para que la semana empiece en lunes (0 = lunes, 6 = domingo)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Agregar días vacíos al principio
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Agregar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      const dayHabits = habits.filter(habit => 
        habit.completedDays[monthKey]?.includes(day)
      );

      days.push(
        <div key={day} data-testid={`dia-${day}`} className="calendar-day">
          <span className="day-number">{day}</span>
          <div className="habits-container">
            {habits.map(habit => (
              <div
                key={habit.id}
                data-testid={`habit-${habit.id}`}
                data-completed={habit.completedDays[monthKey]?.includes(day) ? 'true' : 'false'}
                className={`habit-indicator ${habit.completedDays[monthKey]?.includes(day) ? 'completed' : ''}`}
                onClick={() => handleHabitToggle(habit.id, day)}
                style={{ backgroundColor: habit.color }}
              >
                {habit.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Anterior</button>
        <h2>{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>Siguiente</button>
      </div>
      <div className="calendar-weekdays">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar; 