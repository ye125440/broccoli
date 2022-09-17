import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders header title', () => {
  render(<App />);
  const headerElement = screen.getByText(/BROCCOLI & CO./i);
  expect(headerElement).toBeInTheDocument();
});

test('App renders main content', () => {
  render(<App />);
  const mainContentElement = screen.getByText(/a better way/i);
  expect(mainContentElement).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Request an invite' })).toBeEnabled();
});

test('App renders footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/all right reserved/i);
  expect(footerElement).toBeInTheDocument();
});
