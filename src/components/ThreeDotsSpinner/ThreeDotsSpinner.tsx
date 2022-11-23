import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const ThreeDotsSpinner: React.FC = () => {
  return (
    <div className="w-100 h-25 centered-content-by-flex">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#e15b64"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};
