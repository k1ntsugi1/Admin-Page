import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HeaderOfPage } from '../../components/HeaderOfPage/HeaderOfPage';
import { DeleteElement } from '../../components/DeleteElement/DeleteElement';
import { ThreeDotsSpinner } from '../../components/ThreeDotsSpinner/ThreeDotsSpinner';
import { CustomSlider } from '../../components/CustomSlider/CustomSlider';
import { BackgroundGlass } from '../../components/BackgroundGlass/BackgroundGlass';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAlbums } from '../../store/slices/dataAlbums/fetchAlbums';
import { fetchPhotos } from '../../store/slices/dataPhotos/fetchPhotos';
import { selectorsAlbums, actionsAlbums } from '../../store/slices/dataAlbums/dataAlbumsSlice';
import { actionsPhotos } from '../../store/slices/dataPhotos/dataPhotosSlice';
import { selectPhotosByAlbumId } from '../../store/slices/dataPhotos/customSelectorsOfPhotos';

import { LoadingStatuses } from '../../constants/LoadingStatuses';

export const AlbumPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumId } = useParams();

  const album = useAppSelector((store) => selectorsAlbums.selectById(store, Number(albumId)!));
  const photos = useAppSelector((store) => selectPhotosByAlbumId(store, Number(albumId)!));
  const slides = photos.map((photo) => ({ url: photo.url, title: photo.title }));
  const { statusOfLoading, albumsIdsOfLoadedComments } = useAppSelector(
    (store) => store.dataPhotos
  );

  const navigateHandler = (path: string) => () => {
    dispatch(actionsAlbums.setActiveAlbumId({ id: null }));
    navigate(path);
  };

  useEffect(() => {
    if (!albumId || albumsIdsOfLoadedComments.includes(Number(albumId))) return;
    if (!album) dispatch(fetchAlbums({ method: 'get', albumId: Number(albumId) }));
    dispatch(fetchPhotos({ method: 'get', albumId: Number(albumId) }));
    dispatch(actionsPhotos.addAlbumId({ id: Number(albumId) }));
  }, []);

  return (
    <div className="contianer-page">
      <HeaderOfPage title="Альбом" nameOfPage="albumPage" navigateParams={{ navigateHandler }} />
      <div className='mt-3 p-3 border rounded bg-white'>
        <div className="p-1 d-flex justify-content-between border-bottom">
          <p className="h4">{album?.title}</p>
          <DeleteElement itemId={Number(albumId!)} pathToNextPage="/albums" typeOfElement="album" />
        </div>
        <div className="position-relative">
          {statusOfLoading === LoadingStatuses.pending && <ThreeDotsSpinner />}
          {statusOfLoading === LoadingStatuses.fulfilled && slides.length > 0 && (
            <CustomSlider slides={slides} />
          )}
        </div>
      </div>
    </div>
  );
};
