import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HabitPerformanceList({ habits }) {
  return (
    <div className="space-y-4">
      {habits.map(habit => {
        // Calcular el porcentaje de completado considerando todos los meses
        const allMonths = Object.keys(habit.completedDays);
        const totalCompletedDays = allMonths.reduce((total, month) => {
          return total + (habit.completedDays[month] || []).length;
        }, 0);
        
        const completionRate = Math.round((totalCompletedDays / (allMonths.length * 30)) * 100); 
        
        return (
          <Card key={habit.id} className="overflow-hidden">
            <div className="flex items-center p-4">
              <div className="w-2 h-12 rounded-sm mr-3" style={{ backgroundColor: habit.color }}></div>
              <div className="flex-1">
                <h3 className="font-medium">{habit.title}</h3>
                <p className="text-sm text-slate-500">{habit.category}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completionRate}%</div>
                <Badge variant="secondary">{habit.streak} días de racha</Badge>
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-3">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${completionRate}%`,
                    backgroundColor: habit.color
                  }}
                ></div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
} 