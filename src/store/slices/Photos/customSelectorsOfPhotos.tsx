import { RootState } from '../..';
import { selectorsPhotos } from './dataPhotosSlice';

export const selectPhotosByAlbumId = (state: RootState, albumId: number | string) => {
  const allPhotos = selectorsPhotos.selectEntities(state) ?? {};

  const photosByPostId = Object.values(allPhotos).filter(
    (photo) => Number(photo?.albumId) === albumId
  );

  return photosByPostId;
};