import '@testing-library/jest-dom';
import { vi } from 'vitest';
// Mock básico de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};

if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}


global.localStorage = localStorageMock; 