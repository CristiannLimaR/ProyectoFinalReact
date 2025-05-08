import { Calendar, BarChart2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CategoryList } from './CategoryList';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-slate-900">HabitTracker</h1>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1">
        <div className="p-3">
          <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/')}>
            <Calendar size={18} className="mr-2" />
            <span>Todos los hábitos</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/statistics')}>
            <BarChart2 size={18} className="mr-2" />
            <span>Estadísticas</span>
          </Button>
        </div>
        
        <Separator className="my-2" />
        
        <CategoryList />
      </ScrollArea>
    </div>
  );
}