import { Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Mis Hábitos</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/calendar')}>
            <Calendar size={16} className="mr-2" />
            Ver calendario
          </Button>
          <Button size="sm" onClick={() => navigate('/newhabit')}>
            <PlusCircle size={16} className="mr-2" />
            Nuevo hábito
          </Button>
        </div>
      </div>
    </header>
  );
}