import { useState } from 'react';
import { Sidebar } from '../components/layout/SideBar';
import { Header } from '../components/layout/Header';
import { HabitViewTabs } from '../components/habits/HabitViewTabs';
import { useHabitsContext } from '../context/HabitsContext';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import HabitForm from '../components/habits/HabitForm';

export default function DashboardPage() {
  const { habits } = useHabitsContext();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  
  const filteredHabits = selectedCategory 
    ? habits.filter(habit => habit.category === selectedCategory)
    : habits;
  
  const handleOpenModal = (habit = null) => {
    setHabitToEdit(habit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHabitToEdit(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Mis Hábitos</h1>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Hábito
            </Button>
          </div>

          <HabitViewTabs habits={filteredHabits} onEdit={handleOpenModal} />

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={habitToEdit ? 'Editar Hábito' : 'Nuevo Hábito'}
          >
            <HabitForm
              habitToEdit={habitToEdit}
              onClose={handleCloseModal}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
}