import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage'; // Adjust the path as necessary

test('renders the home page with navigation links', () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/recommend/i)).toBeInTheDocument();
});
