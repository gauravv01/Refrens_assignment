import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBox } from '../components/SearchBox';

afterEach(() => {
  cleanup();
});

describe('Searchbox Component', () => {
  const mockFilters = jest.fn();
  render(<SearchBox filters={mockFilters} />);
  const search = screen.getByTestId('search');

  // Test 1
  test('SearchBox Rendering', () => {
    expect(search).toBeInTheDocument();
  });

  // Test 2
  test('Search Text', () => {
    expect(search).toHaveAttribute('placeholder', 'Search...');
  });
});
