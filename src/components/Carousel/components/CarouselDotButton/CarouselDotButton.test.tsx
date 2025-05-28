import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CarouselDotButton from './CarouselDotButton';

describe('CarouselDotButton', () => {  
  it('renders CarouselDotButton', () => {
    const { getByText } = render(<CarouselDotButton />);

    expect(getByText('CarouselDotButton Component')).toBeInTheDocument();
  });
});
