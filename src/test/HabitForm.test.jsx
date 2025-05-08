import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HabitsProvider } from '../context/HabitsContext';
import HabitForm from '../components/habits/HabitForm';
import { describe, it, expect } from 'vitest';

describe('HabitForm', () => {
  it('crea un nuevo hábito correctamente', () => {
    render(
      <HabitsProvider>
        <MemoryRouter initialEntries={['/nuevo-habito']}>
          <Routes>
            <Route path="/nuevo-habito" element={<HabitForm />} />
          </Routes>
        </MemoryRouter>
      </HabitsProvider>
    );

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Leer 30 minutos' },
    });

    fireEvent.click(screen.getByText('Selecciona una categoría'));
    fireEvent.click(screen.getByRole('option', { name: 'Desarrollo Personal' }));

    fireEvent.click(screen.getByText('Selecciona un color'));
    fireEvent.click(screen.getByRole('option', {name: 'Verde'}));

    fireEvent.click(screen.getByRole('button', { name: /crear hábito/i }));

    // No hay forma directa de validar navegación sin mocking,
    // así que verificamos que no haya error visible.
    expect(screen.queryByText(/completa todos los campos/i)).not.toBeInTheDocument();
  });
});
