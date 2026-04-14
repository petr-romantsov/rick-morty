import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('reneders app content', () => {
    render(<App />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});
