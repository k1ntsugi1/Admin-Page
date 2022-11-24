import React, { useState } from 'react';

import { sizesOfIcons } from '../../utils/constants';

import ArrowLeft from '../../assets/svg/arrow-left-circle.svg';
import ArrowRight from '../../assets/svg/arrow-right-circle.svg';

interface ISlide {
  url: string;
  title: string;
}

interface IProps {
  slides: ISlide[];
}

export const CustomSlider: React.FC<IProps> = ({ slides }) => {
  console.log(slides);
  const { width, height } = sizesOfIcons.s;
  const maxIndex = slides.length - 1;
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const setActiveSlideIndexHandler = (direction: string) => () => {
    const nextIndex = direction === 'left' ? activeSlideIndex - 1 : activeSlideIndex + 1;
    if (nextIndex > maxIndex) {
      setActiveSlideIndex(0);
      return;
    }
    if (nextIndex < 0) {
      setActiveSlideIndex(maxIndex);
      return;
    }
    setActiveSlideIndex(nextIndex);
  };

  return (
    <div>
      <div className="h-300px w-100 position-relative">
        <img
          className="position-absolute top-50 start-0"
          src={ArrowLeft}
          width={width}
          height={height}
          alt="arrow-left-circle"
          onClick={setActiveSlideIndexHandler('left')}
        />
        <img
          className="position-absolute top-50 start-100"
          src={ArrowRight}
          width={width}
          height={height}
          alt="arrow-left-circle"
          onClick={setActiveSlideIndexHandler('right')}
        />
        <img
          className="position-absolute top-50 start-50 translate-middle"
          src={slides[activeSlideIndex].url}
          width={150}
          height={150}
          alt="slide"
        />
      </div>
      <p className="title-page h4 border-bottom">
        <span>{slides[activeSlideIndex].title}</span>
      </p>
      <p className="title-page h4 border-bottom">
        <span>Слайд: {activeSlideIndex + 1}</span>
      </p>
    </div>
  );
};
