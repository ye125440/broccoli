import React from 'react';
import {
  render, screen, act, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteModal from './InviteModal';

test('InviteModal renders "Request"', () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const titleElement = screen.getByText(/Request/i);
  expect(titleElement).toBeInTheDocument();
});

test('should display 3 required errors when form is empty', async () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const sendButton = screen.getByRole('button', { name: 'Send' });
  expect(sendButton).toBeEnabled();
  userEvent.click(sendButton);
  await waitFor(() => {
    const errors = screen.getAllByText(/required/);
    expect(errors).toHaveLength(3);
  });
});

test('should display "Full name needs to be at least 3 characters long" when name filed is not valid', async () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const nameInput = screen.getByPlaceholderText(/Full name/);
  userEvent.type(nameInput, 'ab');
  userEvent.click(sendButton);
  await waitFor(() => {
    const errors = screen.getByText(/at least 3 characters long/);
    expect(errors).toBeInTheDocument();
  });
});

test('should display "Email needs to be in validation email format" when email filed is not valid', async () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const emailInput = screen.getByPlaceholderText(/Email/);
  userEvent.type(emailInput, '123.com');
  userEvent.click(sendButton);
  await waitFor(() => {
    const errors = screen.getByText(/in validation email format/);
    expect(errors).toBeInTheDocument();
  });
});

test('should display "Confirm Email needs to match Email" when confirmEmail filed is not valid', async () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const emailInput = screen.getByPlaceholderText(/Email/);
  const confirmEmailInput = screen.getByPlaceholderText(/Confirm email/);
  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(confirmEmailInput, 'test1@gmail.com');
  userEvent.click(sendButton);
  await waitFor(() => {
    const errors = screen.getByText(/needs to match Email/);
    expect(errors).toBeInTheDocument();
  });
});

test('should display no error tip when all values are valid', async () => {
  const handleClose = jest.fn();
  const isOpen = true;
  render(<InviteModal isOpen={isOpen} handleClose={handleClose} />);
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const nameInput = screen.getByPlaceholderText(/Full name/);
  const emailInput = screen.getByPlaceholderText(/Email/);
  const confirmEmailInput = screen.getByPlaceholderText(/Confirm email/);
  userEvent.type(nameInput, 'Someone');
  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(confirmEmailInput, 'test@gmail.com');
  await act(async () => {
    userEvent.click(sendButton);
    await waitFor(async () => {
      const errors = screen.queryAllByText(/validateTip/);
      expect(errors).toHaveLength(0);
    });
  });
});
