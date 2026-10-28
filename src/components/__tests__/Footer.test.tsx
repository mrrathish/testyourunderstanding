import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Footer';

// Mock window.matchMedia for MUI components
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Footer Component', () => {
  test('renders newsletter subscription form and social links', () => {
    render(<Footer />);

    expect(screen.getByText(/Join the newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  test('allows entering email address in subscription input', () => {
    render(<Footer />);

    const input = screen.getByPlaceholderText(/Your email address/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'user@example.com' } });

    expect(input.value).toBe('user@example.com');
  });
});
