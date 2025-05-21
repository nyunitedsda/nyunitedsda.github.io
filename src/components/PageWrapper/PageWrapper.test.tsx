import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PageWrapper from './PageWrapper';

describe('PageWrapper', () => {  
  it('renders PageWrapper', () => {
    const { getByText } = render(<PageWrapper />);

    expect(getByText('PageWrapper Component')).toBeInTheDocument();
  });
});
