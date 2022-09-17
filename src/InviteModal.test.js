import React from 'react';
import { render, screen } from '@testing-library/react';
import InviteModal from './InviteModal';

test('InviteModal renders "Request"', () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const titleElement = screen.getByText(/Request/i);
  expect(titleElement).toBeInTheDocument();
});
