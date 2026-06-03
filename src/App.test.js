import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the site brand', () => {
  render(<App />);
  expect(screen.getAllByText(/Royal Style/i).length).toBeGreaterThan(0);
});
