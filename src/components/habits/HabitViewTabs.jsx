import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HabitCardList } from './HabitCardList';
import { HabitTable } from './HabitTable';

export const HabitViewTabs = ({ habits = [], onEdit }) => {


  return (
    <Tabs defaultValue="cards" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="cards">Vista Tarjetas</TabsTrigger>
          <TabsTrigger value="table">Vista Tabla</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="cards" className="space-y-4">
        <HabitCardList habits={habits} onEdit={onEdit} />
      </TabsContent>

      <TabsContent value="table">
        <HabitTable habits={habits} onEdit={onEdit} />
      </TabsContent>
    </Tabs>
  );
}