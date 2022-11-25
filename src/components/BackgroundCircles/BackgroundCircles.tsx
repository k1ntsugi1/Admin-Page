import React from 'react';
import cn from 'classnames';

interface IProps {
  color: 'orange' | 'green' | 'blue' | 'violet'
}

export const BackgroundCircles: React.FC<IProps> = ({color}) => {

  const classNameOfCircleColor = cn({
    "color-orange": color === 'orange',
    "color-green": color === 'green',
    "color-blue": color === 'blue',
    "color-violet": color === 'violet',
  })

  const classNameOfCirclesContainer = cn({
    "color-container-orange": color === 'orange',
    "color-container-green": color === 'green',
    "color-container-blue": color === 'blue',
    "color-container-violet": color === 'violet',
  })

  return (
    <div className={`backgroundCircles ${classNameOfCirclesContainer}`}>
      <div className="backgroundCircles__circlesContainer">
        <div className={`backgroundCircles__circle-1 ${classNameOfCircleColor}`}></div>
        <div className={`backgroundCircles__circle-2 ${classNameOfCircleColor}`}></div>
        <div className={`backgroundCircles__circle-3 ${classNameOfCircleColor}`}></div>
        <div className={`backgroundCircles__circle-4 ${classNameOfCircleColor}`}></div>
      </div>
    </div>
  );
};
