import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const MagnifyingGlassSpinner: React.FC = () => {
  return (
    <div className="w-100 vh-100 centered-content-by-flex">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="rgb(248 249 250 / 54%)"
        color = '#e15b64'
      />
    </div>
  );
};