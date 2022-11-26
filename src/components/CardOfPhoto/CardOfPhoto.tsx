import React from 'react';

import { DeleteElement } from '../DeleteElement/DeleteElement';

interface IPhoto {
  photo: {
    title: string;
    url: string;
    thumbnailUrl: string;
    id?: number;
  };
}

export const CardOfPhoto: React.FC<IPhoto> = ({ photo }) => {
  return (
    <div className="p-3 border rounded d-flex flex-column justify-content-end">
      {photo.id && (
        <div className="p-2 d-flex justify-content-end border-bottom">
          <DeleteElement itemId={photo.id} typeOfElement="photo" />
        </div>
      )}

      <img className="mt-1" src={photo.url} width={150} height={150} />
    </div>
  );
};
