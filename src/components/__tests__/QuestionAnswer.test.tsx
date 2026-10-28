import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import QuestionAnswer from '../QuestionAnswer';

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

describe('QuestionAnswer Component', () => {
  test('renders first question and handles option selection', () => {
    render(
      <MemoryRouter initialEntries={['/qa/card1']}>
        <Routes>
          <Route path="/qa/:cardId" element={<QuestionAnswer />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Questionnaire \(from card card1\)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Which option best describes your favourite development workflow\?/i),
    ).toBeInTheDocument();

    const option = screen.getByLabelText('Pair programming') as HTMLInputElement;
    expect(option.checked).toBe(false);

    fireEvent.click(option);
    expect(option.checked).toBe(true);
  });

  test('navigates through questions using Next and Previous buttons', () => {
    render(
      <MemoryRouter initialEntries={['/qa/1']}>
        <Routes>
          <Route path="/qa/:cardId" element={<QuestionAnswer />} />
        </Routes>
      </MemoryRouter>,
    );

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    const nextButton = screen.getByRole('button', { name: /Next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    expect(
      screen.getByText(/Which area would you like to improve skill-wise\?/i),
    ).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);
    expect(
      screen.getByText(/Which option best describes your favourite development workflow\?/i),
    ).toBeInTheDocument();
  });
});
