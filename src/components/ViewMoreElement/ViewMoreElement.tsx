import React from 'react';

interface IProps {
  onClick: () => void;
}

export const ViewMoreElement: React.FC<IProps> = ({ onClick }) => {
  return (
    <div className="cursor-pointer centered-content-by-position" onClick={onClick}>
      <div className="bg-light p-2 centered-content-by-flex border rounded fw-bold">Посмотреть</div>
    </div>
  );
};
