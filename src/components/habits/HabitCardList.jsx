import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HabitActions } from './HabitActions';
import { HabitDayTracker } from './HabitDayTracker';

export const HabitCardList = ({ habits = [] }) => {

  return (
    <>
      {habits.map(habit => (
        <Card key={habit.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="w-3 h-12 rounded-sm mr-3" style={{ backgroundColor: habit.color }}></div>
                <div>
                  <CardTitle>{habit.title}</CardTitle>
                  <CardDescription>{habit.category}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {habit.streak} días de racha
                </Badge>
                <HabitActions habitId={habit.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <HabitDayTracker habitId={habit.id} days={habit.days} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
