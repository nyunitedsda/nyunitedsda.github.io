import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { type FC, useCallback } from 'react';
import CarouselDotButton from './components/CarouselDotButton/CarouselDotButton';
import useDotButton from './components/CarouselDotButton/useDotButton';
import type { CarouselProps } from './types';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay'
import useCarouselArrowButtons from './components/CarouselArrowButton/useCarouselArrowButton';
import CarouselArrowButton from './components/CarouselArrowButton/CarouselArrowButton';

const rootSx: SxProps<Theme> = {
  '& .embla': {
    overflow: "hidden",
  },
  "& .embla__container": {
    display: 'flex',
  },
  '& .embla__slide': {
    flex: '0 0 100%',
    minWidth: 0,
  },
}

const Carousel: FC<CarouselProps> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useCarouselArrowButtons(emblaApi, onNavButtonClick)

  return (
    <Box component="section" className="embla" sx={rootSx}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((i) => (
            <div className="embla__slide" key={i.src}>
              <img className="embla__slide__number" src={i.src} alt={i.alt ?? `${i.src}-image`} />
              {/* <div className="embla__slide__number">{index + 1}</div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <CarouselArrowButton arrowDirection='prev' onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <CarouselArrowButton arrowDirection='next' onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <CarouselDotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </Box>
  )
};

export default Carousel;
