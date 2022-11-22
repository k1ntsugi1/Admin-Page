import React, { RefObject } from 'react';
import { useAppSelector } from '../../store/hooks';
import { CircleScrollProgressbar } from '../CircleScrollProgressbar/CircleScrollProgressbar';
import { ScrollIntoViewElement } from '../ScrollIntoViewElement/ScrollIntoViewElement';
export const ElementOfScrollProgress: React.FC<{ elementOfBreakPoint?: RefObject<HTMLDivElement> }> = (props) => {
  const { elementOfBreakPoint } = props;
  const { percentOfFilling } = useAppSelector((store) => store.uiProgressbar);

  return (
    <div className="progress-section">
      <CircleScrollProgressbar />
      {elementOfBreakPoint && percentOfFilling > 40 && (
        <ScrollIntoViewElement
          elementOfBreakPoint={elementOfBreakPoint}
        />
      )}
    </div>
  );
};