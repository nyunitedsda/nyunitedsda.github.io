import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Donations from './Donations';

describe('Donations', () => {  
  it('renders Donations', () => {
    const { getByText } = render(<Donations />);

    expect(getByText('Donations Component')).toBeInTheDocument();
  });
});
