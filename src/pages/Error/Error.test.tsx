import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Error from './Error';

describe('Error', () => {  
  it('renders Error', () => {
    const { getByText } = render(<Error />);

    expect(getByText('Error Component')).toBeInTheDocument();
  });
});
