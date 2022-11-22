import React from 'react';
import { useAppSelector } from '../../store/hooks';

export const CircleScrollProgressbar: React.FC = () => {
  const { percentOfFilling } = useAppSelector((store) => store.uiProgressbar);
  const style = {
    background: `conic-gradient(black ${(percentOfFilling / 100) * 360}deg, white 0deg)`
  };

  return (
    <div className="wrapper-circle-progress-bar border rounded-circle">
      <div className="progress" style={style}>
        <div className="face border rounded-circle">{percentOfFilling.toFixed(0) + '%'}</div>
      </div>
    </div>
  );
};
