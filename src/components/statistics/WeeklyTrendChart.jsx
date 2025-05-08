import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function WeeklyTrendChart({ habits }) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Comienza en lunes

  const weeklyData = Array(7).fill().map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const day = date.getDate();


    
    const completados = habits.filter(habit => {
      // Buscar en todos los meses disponibles
      const allMonths = Object.keys(habit.completedDays);
      return allMonths.some(month => {
        const completedDays = habit.completedDays[month] || [];
        return completedDays.includes(day);
      });
    }).length;

    return {
      name: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index],
      completados,
      total: habits.length
    };
  });

  const maxValue = Math.max(...weeklyData.map(d => d.completados), habits.length);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tendencia semanal</CardTitle>
        <CardDescription>Hábitos completados cada día</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, maxValue]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completados" name="Completados" fill="#3182ce" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 