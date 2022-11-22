import React from 'react';
import { useAppSelector } from '../../store/hooks';

export const StraightScrollProgressbar: React.FC = () => {

  const { percentOfFilling } = useAppSelector((store) => store.uiProgressbar);
  const style = { "height": percentOfFilling + '%' };

  return (
    <div className="wrapper-straight-progress-bar">
      <div className="progress-container">
        <div className="progress background-color-progressBar" style={style}></div>
      </div>
      <div className="progress-text">
        {percentOfFilling.toFixed(0) + '%'}
      </div>
    </div>
  );
};