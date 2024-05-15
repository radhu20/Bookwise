import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RecommendPage from './RecommendPage'; // Adjust the path as necessary

test('renders the recommend page', () => {
  render(
    <Router>
      <RecommendPage />
    </Router>
  );

  expect(screen.getByText(/recommendations/i)).toBeInTheDocument();
});
