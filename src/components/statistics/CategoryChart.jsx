import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function CategoryChart({ habits }) {
  // Agrupar hábitos por categoría y calcular el porcentaje de completado
  const categoryData = habits.reduce((acc, habit) => {
    const existingCategory = acc.find(cat => cat.name === habit.category);
    
    
    const allMonths = Object.keys(habit.completedDays);
    const totalCompletedDays = allMonths.reduce((total, month) => {
      return total + (habit.completedDays[month] || []).length;
    }, 0);
    
    const completionRate = (totalCompletedDays / (allMonths.length * 30)) * 100

    if (existingCategory) {
      existingCategory.value += completionRate;
      existingCategory.count += 1;
    } else {
      acc.push({
        name: habit.category,
        value: completionRate,
        count: 1,
        color: habit.color
      });
    }
    return acc;
  }, []);

  
  const categoryAverages = categoryData.map(cat => ({
    ...cat,
    value: cat.value / cat.count
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completado por categoría</CardTitle>
        <CardDescription>Porcentaje de completado por categoría</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryAverages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryAverages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${Math.round(value)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 