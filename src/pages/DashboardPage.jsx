import { Sidebar } from '../components/layout/SideBar';
import { Header } from '../components/layout/Header';
import { HabitViewTabs } from '../components/habits/HabitViewTabs';
import { useHabitsContext } from '../context/HabitsContext';
import { useSearchParams } from 'react-router-dom';

export default function HabitTracker() {
  const { habits } = useHabitsContext();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const filteredHabits = selectedCategory 
    ? habits.filter(habit => habit.category === selectedCategory)
    : habits;
  
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <HabitViewTabs habits={filteredHabits} />
        </main>
      </div>
    </div>
  );
}