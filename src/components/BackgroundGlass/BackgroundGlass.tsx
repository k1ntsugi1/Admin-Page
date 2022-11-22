import React from 'react';
import cn from 'classnames';

interface IProps {
  className?: string;
}
export const BackgroundGlass: React.FC<IProps> = ({ className }) => {
  const classNameOfContainer = cn(
    'position-absolute start-0 top-0 w-100 h-100 z-index-m10',
    className
  );

  const classNameOfGlassElement = cn('container-glass', className);

  return (
    <div className={classNameOfContainer}>
      <div className={classNameOfGlassElement}></div>
    </div>
  );
};
