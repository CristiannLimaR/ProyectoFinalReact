import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const CategoryList = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'salud', name: 'Salud', color: '#3182ce' },
    { id: 'bienestar-mental', name: 'Bienestar Mental', color: '#805ad5' },
    { id: 'desarrollo-personal', name: 'Desarrollo Personal', color: '#dd6b20' },
    { id: 'fitness', name: 'Fitness', color: '#38a169' }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-between text-sm font-medium mb-2">
        <h2>Categorías</h2>
        <ChevronDown size={16} />
      </div>
      <div className="space-y-1 ml-1">
        {categories.map((category) => (
          <Button 
            key={category.id} 
            variant="ghost" 
            className="w-full justify-start h-8"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}