import React from 'react';
import cn from 'classnames';

interface IProps {
  title: string;
  className?: string;
}

export const TitleOfPage: React.FC<IProps> = ({ title, className }) => {
  const classNameOfTitleContainer = cn('title-page', className ? className : '')
  return (
    <div className={classNameOfTitleContainer}>
      <span>{title}</span>
    </div>
  );
};
