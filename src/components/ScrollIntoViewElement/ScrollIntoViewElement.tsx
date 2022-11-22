import React, { RefObject } from 'react';
import CaretIcon from '../../assets/svg/caret-up-fill.svg';
import { sizesOfIcons } from '../../utils/constants';

interface IProps {
  elementOfBreakPoint: RefObject<HTMLElement>;
}

export const ScrollIntoViewElement: React.FC<IProps> = (props) => {
  const { elementOfBreakPoint } = props;
  const { width, height } = sizesOfIcons.s
  return (
    <div
      onClick={() => {
        elementOfBreakPoint.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }}
    >
      <img src={CaretIcon} width={width} height={height} />
    </div>
  );
};

