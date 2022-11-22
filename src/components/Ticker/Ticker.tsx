import React from 'react';
import cn from 'classnames';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClickHandler?: () => void;
}

export const Ticker: React.FC<IProps> = (props) => {
  const { className, children, onClickHandler } = props;

  const classNamesOfContainer = cn('container-ticker', className);
  const classNamesOfFrontElement = cn('first-element-of-ticker');
  const classNamesOfBackElement = cn('second-element-of-ticker');

  return (
    <div className={classNamesOfContainer} onClick={onClickHandler}>
      {React.Children.map(children, (child, index) => (
        <div className={index === 0 ? classNamesOfFrontElement : classNamesOfBackElement}>
          {child}
        </div>
      ))}
    </div>
  );
};
