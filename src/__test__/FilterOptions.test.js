import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterOptions } from '../components/FilterOptions';

afterEach(() => {
  cleanup();
});

describe('Filters Component', () => {
  const mockFilters = jest.fn();
  render(<FilterOptions filters={mockFilters} />);
  const filter = screen.getByTestId('filters');

  // Test 1
  test('Filters Rendering', () => {
    expect(filter).toBeInTheDocument();
  });

  // Test 2
  test('Filter Text', () => {
    expect(filter).toBeTruthy();
  });
});
