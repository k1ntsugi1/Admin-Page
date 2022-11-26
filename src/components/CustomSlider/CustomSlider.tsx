import React, { useState } from 'react';

import { SizesOfIcons } from '../../constants/SizesOfIcons'; 

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
  const { width, height } = SizesOfIcons.s;
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
      <div className="h-300px w-100 position-relative d-flex flex-column justify-content-end">
        <img
          className="cursor-pointer hover position-absolute top-50 start-0 translate-middle"
          src={ArrowLeft}
          width={width}
          height={height}
          alt="arrow-left-circle"
          onClick={setActiveSlideIndexHandler('left')}
        />
        <img
          className="cursor-pointer hover position-absolute top-50 start-100 translate-middle"
          src={ArrowRight}
          width={width}
          height={height}
          alt="arrow-left-circle"
          onClick={setActiveSlideIndexHandler('right')}
        />
        <img
          className="position-absolute top-50 start-50 translate-middle"
          src={slides[activeSlideIndex].url}
          width={250}
          height={250}
          alt="slide"
        />
      </div>
      <div className="centered-content-by-flex h5 border-bottom">
        <span className='mx-auto'>{slides[activeSlideIndex].title}</span>
      </div>
      <div className="centered-content-by-flex h6 border-bottom">
        <span className='mx-auto'>Слайд: {activeSlideIndex + 1}</span>
      </div>
    </div>
  );
};
