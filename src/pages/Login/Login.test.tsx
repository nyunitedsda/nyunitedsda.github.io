import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Login from './Login';

describe('Login', () => {  
  it('renders Login', () => {
    const { getByText } = render(<Login />);

    expect(getByText('Login Component')).toBeInTheDocument();
  });
});
