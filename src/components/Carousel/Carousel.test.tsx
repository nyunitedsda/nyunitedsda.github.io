import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Carousel from './Carousel';

describe('Carousel', () => {  
  it('renders Carousel', () => {
    const { getByText } = render(<Carousel />);

    expect(getByText('Carousel Component')).toBeInTheDocument();
  });
});
