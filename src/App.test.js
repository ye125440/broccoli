import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});

test('click event handler should works on invite button', () => {
  render(<App />);
  const inviteButton = screen.getByRole('button', { name: 'Request an invite' });
  expect(inviteButton).toBeEnabled();
  userEvent.click(inviteButton);
  expect(screen.getByLabelText('Invite Modal')).toBeInTheDocument();
});

test('App renders footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/all right reserved/i);
  expect(footerElement).toBeInTheDocument();
});
