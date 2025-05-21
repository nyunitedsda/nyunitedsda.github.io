import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from './Contact';
import '@testing-library/jest-dom';

describe('Contact', () => {  
  it('renders Contact', () => {
    const { getByText } = render(<Contact />);

    expect(getByText('Contact Component')).toBeInTheDocument();
  });
});
