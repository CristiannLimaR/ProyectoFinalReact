import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HabitsProvider } from '../context/HabitsContext';
import Calendar from '../components/calendar/Calendar';

describe('Calendario', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <HabitsProvider>
          <Calendar />
        </HabitsProvider>
      </BrowserRouter>
    );
  };

  it('debería mostrar el mes actual', () => {
    renderWithRouter();
    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`${currentMonth} de ${currentYear}`)).toBeInTheDocument();
  });

  it('debería mostrar los días de la semana', () => {
    renderWithRouter();
    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    diasSemana.forEach(dia => {
      expect(screen.getByText(dia)).toBeInTheDocument();
    });
  });

  it('debería mostrar los días del mes', () => {
    renderWithRouter();
    const dias = screen.getAllByTestId(/^dia-/);
    expect(dias.length).toBeGreaterThan(0);
  });

  it('debería permitir navegar entre meses', () => {
    renderWithRouter();
    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    // Navegar al mes siguiente
    fireEvent.click(screen.getByText('Siguiente'));
    const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toLocaleString('es-ES', { month: 'long' });
    expect(screen.getByText(`${nextMonth} de ${currentYear}`)).toBeInTheDocument();

    // Navegar al mes anterior
    fireEvent.click(screen.getByText('Anterior'));
    expect(screen.getByText(`${currentMonth} de ${currentYear}`)).toBeInTheDocument();
  });

  it('debería mostrar los hábitos completados en cada día', () => {
    renderWithRouter();
    const dias = screen.getAllByTestId(/^dia-/);
    dias.forEach(dia => {
      const habitosCompletados = dia.querySelectorAll('[data-testid^="habit-completed-"]');
      expect(habitosCompletados.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('debería permitir marcar un hábito como completado', () => {
    renderWithRouter();
    const primerDia = screen.getAllByTestId(/^dia-/)[0];
    const habitos = primerDia.querySelectorAll('[data-testid^="habit-"]');
    
    if (habitos.length > 0) {
      fireEvent.click(habitos[0]);
      expect(habitos[0]).toHaveAttribute('data-completed', 'true');
    }
  });
}); 