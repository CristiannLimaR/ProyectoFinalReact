import { Sidebar } from '../components/layout/SideBar';
import { Header } from '../components/layout/Header';
import { SummaryCards } from '../components/statistics/SummaryCards';
import { WeeklyTrendChart } from '../components/statistics/WeeklyTrendChart';
import { CategoryChart } from '../components/statistics/CategoryChart';
import { HabitPerformanceList } from '../components/statistics/HabitPerformanceList';
import { useHabitsContext } from '../context/HabitsContext';

export default function EstadisticasPage() {
  const { habits } = useHabitsContext();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Estadísticas</h1>
          
          <SummaryCards habits={habits} />
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <WeeklyTrendChart habits={habits} />
            <CategoryChart habits={habits} />
          </div>

          <h2 className="font-semibold text-lg mt-6 mb-4">Rendimiento por hábito</h2>
          <HabitPerformanceList habits={habits} />
        </main>
      </div>
    </div>
  );
} 