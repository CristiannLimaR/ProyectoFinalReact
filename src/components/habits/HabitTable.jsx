import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';
  import { Card, CardContent } from '@/components/ui/card';
  import { HabitActions } from './HabitActions';
  import { useHabitsContext } from '../../context/HabitsContext';
  import { useState, useEffect } from 'react';
  import { CheckCircle } from 'lucide-react';
  
  export function HabitTable({ habits }) {
    const { dispatch } = useHabitsContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    
    const getDayName = (index) => {
      const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      return days[index];
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

    const handleToggleCompletion = (habitId, date, isScheduled) => {
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
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Hábito</TableHead>
                {dates.map((date, i) => (
                  <TableHead key={i} className="text-center">
                    <div>{getDayName(i)}</div>
                    <div className="text-xs text-slate-500">{date.getDate()}</div>
                  </TableHead>
                ))}
                <TableHead className="text-center">Racha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {habits.map(habit => (
                <TableRow key={habit.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-3 h-8 rounded-sm mr-3" style={{ backgroundColor: habit.color }}></div>
                      <div>
                        <div className="font-medium">{habit.title}</div>
                        <div className="text-sm text-slate-500">{habit.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  {dates.map((date, i) => {
                    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    const isCompleted = habit.completedDays?.[monthKey]?.includes(date.getDate());
                    const isScheduled = habit.days[i];
                    const isToday = date.getDate() === currentDate.getDate() && 
                                  date.getMonth() === currentDate.getMonth() && 
                                  date.getFullYear() === currentDate.getFullYear();
                    
                    return (
                      <TableCell key={i} className="text-center">
                        <button 
                          className={`w-8 h-8 rounded-full mx-auto inline-flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700' 
                              : isToday
                                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700'
                                : isScheduled 
                                  ? 'bg-slate-100 text-slate-400 hover:bg-slate-200' 
                                  : 'opacity-30 cursor-not-allowed'
                          }`}
                          onClick={() => handleToggleCompletion(habit.id, date, isScheduled)}
                          disabled={!isScheduled}
                        >
                          {isCompleted && <CheckCircle size={14} className="flex-shrink-0" />}
                        </button>
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center">
                    <Badge variant="secondary">
                      {habit.streak} días
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <HabitActions habitId={habit.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }