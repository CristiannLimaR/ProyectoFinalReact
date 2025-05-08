import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HabitsProvider } from '../context/HabitsContext';
import DashboardPage from '../pages/DashboardPage';


vi.mock('../components/layout/SideBar', () => ({
  Sidebar: () => <div>Barra Lateral</div>
}));

vi.mock('../components/layout/Header', () => ({
  Header: () => <div>Encabezado</div>
}));

vi.mock('../components/habits/HabitViewTabs', () => ({
  HabitViewTabs: ({ habits }) => (
    <div data-testid="habits-list">
      {habits.map(habit => (
        <div key={habit.id} data-testid={`habit-${habit.id}`}>
          {habit.title} - {habit.category}
        </div>
      ))}
    </div>
  )
}));

describe('Página de Dashboard', () => {
  const renderWithRouter = (initialRoute = '/') => {
    window.history.pushState({}, 'Página de prueba', initialRoute);
    return render(
      <BrowserRouter>
        <HabitsProvider>
          <DashboardPage />
        </HabitsProvider>
      </BrowserRouter>
    );
  };

  it('debería renderizar todos los componentes', () => {
    renderWithRouter();
    expect(screen.getByText('Barra Lateral')).toBeInTheDocument();
    expect(screen.getByText('Encabezado')).toBeInTheDocument();
    expect(screen.getByTestId('habits-list')).toBeInTheDocument();
  });

  it('debería filtrar hábitos por categoría', () => {
    renderWithRouter('/?category=salud');
    const habits = screen.getAllByTestId(/^habit-/);
    habits.forEach(habit => {
      expect(habit).toHaveTextContent(/salud/);
    });
  });

  it('debería mostrar todos los hábitos cuando no hay categoría seleccionada', () => {
    renderWithRouter();
    const habits = screen.getAllByTestId(/^habit-/);
    expect(habits.length).toBeGreaterThan(0);
  });
}); 