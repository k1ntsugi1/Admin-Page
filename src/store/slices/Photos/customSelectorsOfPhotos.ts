import { RootState } from '../..';
import { selectorsPhotos } from './dataPhotosSlice';

export const selectPhotosByAlbumId = (state: RootState, albumId: number | null) => {
  const allPhotos = selectorsPhotos.selectAll(state);
  const photosByPostId = allPhotos.filter(
    (photo) => photo.albumId === albumId
  ).flat();

  return photosByPostId;
};