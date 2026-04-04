import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./shared/api/http', () => ({
  getText: vi.fn(async () => ''),
  getJson: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    createBrowserRouter: vi.fn(() => ({})),
    RouterProvider: () => <div data-testid="router-provider" />,
  };
});

test('renders App', () => {
  render(<App faro={undefined}/>);
});
