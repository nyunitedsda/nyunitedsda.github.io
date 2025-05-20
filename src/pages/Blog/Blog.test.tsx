import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Blog from './Blog';

describe('Blog', () => {  
  it('renders Blog', () => {
    const { getByText } = render(<Blog />);

    expect(getByText('Blog Component')).toBeInTheDocument();
  });
});
