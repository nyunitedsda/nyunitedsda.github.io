import type { FC } from 'react';
import type { CarouselDotButtonProps } from './types';

const CarouselDotButton: FC<CarouselDotButtonProps> = (props) => {
   const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
};
  
export default CarouselDotButton;
  