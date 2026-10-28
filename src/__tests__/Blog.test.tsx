import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blog from '../Blog';

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

describe('Blog Component', () => {
  test('renders Blog component with main content and footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Blog disableCustomTheme />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Join the newsletter/i)).toBeInTheDocument();
  });
});
