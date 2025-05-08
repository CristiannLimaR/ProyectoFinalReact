import { useState, useEffect } from 'react';
import { useHabitsContext } from '../../context/HabitsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORIES = [
  { id: 'salud', name: 'Salud' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'bienestar-mental', name: 'Bienestar Mental' },
  { id: 'desarrollo-personal', name: 'Desarrollo Personal' },
  { id: 'productividad', name: 'Productividad' }
];

const COLORS = [
  { id: 'blue', value: '#3182ce', name: 'Azul' },
  { id: 'purple', value: '#805ad5', name: 'Morado' },
  { id: 'orange', value: '#dd6b20', name: 'Naranja' },
  { id: 'green', value: '#38a169', name: 'Verde' },
  { id: 'red', value: '#e53e3e', name: 'Rojo' },
  { id: 'pink', value: '#d53f8c', name: 'Rosa' }
];

const DAYS = [
  { id: 0, name: 'Lunes' },
  { id: 1, name: 'Martes' },
  { id: 2, name: 'Miércoles' },
  { id: 3, name: 'Jueves' },
  { id: 4, name: 'Viernes' },
  { id: 5, name: 'Sábado' },
  { id: 6, name: 'Domingo' }
];

export default function HabitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, dispatch } = useHabitsContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [selectedDays, setSelectedDays] = useState([true, true, true, true, true, false, false]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (id && habits.length > 0 && !isInitialized) {
      const habitToEdit = habits.find(h => h.id === parseInt(id));
      if (habitToEdit) {
        setTitle(habitToEdit.title);
        setCategory(habitToEdit.category);
        setColor(habitToEdit.color);
        setSelectedDays(habitToEdit.days);
        setIsInitialized(true);
      }
    }
  }, [id, habits, isInitialized]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !color) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (id) {
      dispatch({
        type: 'UPDATE_HABIT',
        payload: {
          id: parseInt(id),
          data: { title, category, color, days: selectedDays }
        }
      });
    } else {
      const newHabit = {
        id: Date.now(),
        title,
        category,
        streak: 0,
        days: selectedDays,
        color,
        completedDays: {}
      };
      dispatch({ type: 'ADD_HABIT', payload: newHabit });
    }

    navigate('/');
  };

  const handleDayToggle = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  if (id && !isInitialized) {
    return <p className="text-center">Cargando hábito...</p>;
  }
  
  return (
    
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{id ? 'Editar Hábito' : 'Nuevo Hábito'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Beber 2L de agua"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            {console.log(category)}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            {console.log(color)}
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map(col => (
                  <SelectItem key={col.id} value={col.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: col.value }}
                      />
                      {col.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Días de la semana</Label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS.map(day => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day.id}`}
                    checked={selectedDays[day.id]}
                    onCheckedChange={() => handleDayToggle(day.id)}
                  />
                  <Label htmlFor={`day-${day.id}`}>{day.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancelar
            </Button>
            <Button type="submit">
              {id ? 'Guardar Cambios' : 'Crear Hábito'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
