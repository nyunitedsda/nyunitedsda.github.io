import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CarouselArrowButtonn from './CarouselArrowButton';

describe('CarouselArrowButtonn', () => {  
  it('renders CarouselArrowButtonn', () => {
    const { getByText } = render(<CarouselArrowButtonn />);

    expect(getByText('CarouselArrowButtonn Component')).toBeInTheDocument();
  });
});
