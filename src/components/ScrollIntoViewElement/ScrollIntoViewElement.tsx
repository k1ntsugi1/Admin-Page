import React, { RefObject } from 'react';

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import CaretIcon from '../../assets/svg/caret-up-fill.svg';

interface IProps {
  elementOfBreakPoint: RefObject<HTMLElement>;
}

export const ScrollIntoViewElement: React.FC<IProps> = (props) => {
  const { elementOfBreakPoint } = props;
  const { width, height } = SizesOfIcons.s
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

