import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HabitsProvider, useHabitsContext } from '../context/HabitsContext';
import { initialHabits } from '../components/data/habitData';

// Componente de prueba para todas las operaciones
const TestComponent = () => {
  const { habits, dispatch } = useHabitsContext();
  return (
    <div>
      <div data-testid="habits-count">{habits.length}</div>
      <div data-testid="habits-list">
        {habits.map(habit => (
          <div key={habit.id} data-testid={`habit-${habit.id}`}>
            <span data-testid={`habit-title-${habit.id}`}>{habit.title}</span>
            <span data-testid={`habit-category-${habit.id}`}>{habit.category}</span>
            <span data-testid={`habit-streak-${habit.id}`}>{habit.streak}</span>
            {habit.completedDays['2025-05']?.includes(8) && 
              <span data-testid={`habit-completed-${habit.id}`}>Completado</span>
            }
          </div>
        ))}
      </div>
      <button onClick={() => dispatch({ 
        type: 'ADD_HABIT', 
        payload: { 
          title: 'Nuevo Hábito', 
          category: 'salud',
          color: '#3182ce',
          days: [true, true, true, true, true, false, false]
        } 
      })}>
        Agregar
      </button>
      <button onClick={() => dispatch({ 
        type: 'UPDATE_HABIT', 
        payload: { 
          id: 1, 
          data: { title: 'Hábito Editado' } 
        } 
      })}>
        Editar
      </button>
      <button onClick={() => dispatch({ type: 'DELETE_HABIT', payload: 1 })}>
        Eliminar
      </button>
      <button onClick={() => dispatch({ 
        type: 'TOGGLE_HABIT_COMPLETION', 
        payload: { 
          habitId: 1, 
          monthKey: '2025-05', 
          day: 8 
        } 
      })}>
        Marcar
      </button>
    </div>
  );
};

describe('Contexto de Hábitos', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debería inicializar con los hábitos iniciales', () => {
    render(
      <HabitsProvider>
        <TestComponent />
      </HabitsProvider>
    );

    expect(screen.getByTestId('habits-count')).toHaveTextContent(initialHabits.length.toString());
    expect(screen.getByTestId('habit-title-1')).toHaveTextContent('Beber 2L de agua');
  });

  it('debería agregar un nuevo hábito', () => {
    render(
      <HabitsProvider>
        <TestComponent />
      </HabitsProvider>
    );

    const initialCount = parseInt(screen.getByTestId('habits-count').textContent);
    fireEvent.click(screen.getByText('Agregar'));
    expect(screen.getByTestId('habits-count')).toHaveTextContent((initialCount + 1).toString());
    expect(screen.getByText('Nuevo Hábito')).toBeInTheDocument();
  });

  it('debería editar un hábito existente', () => {
    render(
      <HabitsProvider>
        <TestComponent />
      </HabitsProvider>
    );

    fireEvent.click(screen.getByText('Editar'));
    expect(screen.getByTestId('habit-title-1')).toHaveTextContent('Hábito Editado');
  });

  it('debería eliminar un hábito', () => {
    render(
      <HabitsProvider>
        <TestComponent />
      </HabitsProvider>
    );

    const initialCount = parseInt(screen.getByTestId('habits-count').textContent);
    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.getByTestId('habits-count')).toHaveTextContent((initialCount - 1).toString());
    expect(screen.queryByTestId('habit-1')).not.toBeInTheDocument();
  });

  it('debería marcar un hábito como completado', () => {
    render(
      <HabitsProvider>
        <TestComponent />
      </HabitsProvider>
    );

    fireEvent.click(screen.getByText('Marcar'));
    expect(screen.getByTestId('habit-completed-1')).toBeInTheDocument();
    expect(screen.getByTestId('habit-streak-1')).toHaveTextContent('6');
  });
}); 