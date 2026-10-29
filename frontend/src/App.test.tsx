import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// todo-at: create react app boilerplate, which always fails. replace with real tests?
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
