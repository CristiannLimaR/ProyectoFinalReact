import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryList } from '../components/layout/CategoryList';
import { BrowserRouter } from 'react-router-dom';

describe('Lista de Categorías', () => {
  it('debería renderizar las categorías', () => {
    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    );

    expect(screen.getByText('salud')).toBeInTheDocument();
    expect(screen.getByText('fitness')).toBeInTheDocument();
  });
}); 