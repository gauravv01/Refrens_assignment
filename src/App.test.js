import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders landing page', () => {
  // Test if the App component renders without crashing
  render(<App />);

  // Test if the heading is rendered
  expect(screen.getByRole('heading')).toHaveTextContent(/Characters From Rick and Morty/);
});
