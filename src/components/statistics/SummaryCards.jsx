import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCards({ habits }) {
  const totalHabits = habits.length;
  
  // Calcular la tasa de completado basada en los días completados del mes actual
  const currentMonth = new Date().toISOString().slice(0, 7); // Formato: YYYY-MM
  const completedHabits = habits.filter(habit => {
    const completedDays = habit.completedDays[currentMonth] || [];
    return completedDays
  }).length;
  
  // Encontrar la mejor racha
  const bestStreak = Math.max(...habits.map(habit => habit.streak));
  
  // Encontrar la mejor categoría basada en el porcentaje de completado
  const bestCategory = habits.reduce((best, current) => {
    const completedDays = current.completedDays[currentMonth] || [];
    const currentCompletion = (completedDays.length / 30) * 100; // Asumiendo 30 días por mes
    return currentCompletion > best.completion ? { name: current.category, completion: currentCompletion } : best;
  }, { name: '', completion: 0 });

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Mejor racha actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{bestStreak} días</div>
          <p className="text-xs text-slate-500 mt-1">Mejor hábito</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Mejor categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{bestCategory.name}</div>
          <p className="text-xs text-slate-500 mt-1">{Math.round(bestCategory.completion)}% completado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Total hábitos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalHabits}</div>
          <p className="text-xs text-slate-500 mt-1">{completedHabits} activos este mes</p>
        </CardContent>
      </Card>
    </div>
  );
} 