import { useNavigate } from 'react-router-dom';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
  } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import { MoreHorizontal, Edit3, Trash2, BarChart2 } from 'lucide-react';
  import { useHabitsContext } from '../../context/HabitsContext';
  
  export function HabitActions({ habitId }) {
    const navigate = useNavigate();
    const { dispatch } = useHabitsContext();
  
    const handleEdit = () => {
      navigate(`/editar-habito/${habitId}`);
    };
  
    const handleDelete = () => {
      dispatch({ type: "DELETE_HABIT", payload: habitId });
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <Edit3 size={14} className="mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-red-600">
            <Trash2 size={14} className="mr-2" /> Eliminar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  