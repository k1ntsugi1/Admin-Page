import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import { NavBtnsOfPage } from '../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { ThreeDotsSpinner } from '../components/ThreeDotsSpinner/ThreeDotsSpinner';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbums } from '../store/slices/Albums/fetchAlbums';
import { fetchPhotos } from '../store/slices/Photos/fetchPhotos';
import { selectorsAlbums, actionsAlbums } from '../store/slices/Albums/dataAlbumsSlice';
import { actionsPhotos } from '../store/slices/Photos/dataPhotosSlice';
import { selectPhotosByAlbumId } from '../store/slices/Photos/customSelectorsOfPhotos';
import { dataOfNavBtns, LoadingStatuses } from '../utils/constants';

export const AlbumPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumId } = useParams();

  const album = useAppSelector((store) => selectorsAlbums.selectById(store, Number(albumId)!));
  const photos = useAppSelector((store) => selectPhotosByAlbumId(store, Number(albumId)!));
  const { statusOfLoading, albumsIdsOfLoadedComments } = useAppSelector(
    (store) => store.dataPhotos
  );

  const moveToNewPagePageHandler = (path: string) => () => {
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
      <NavBtnsOfPage btns={dataOfNavBtns.albumPage} onClickHandler={moveToNewPagePageHandler} />
      <TitleOfPage title="Альбом" />
      <p className='title-page h4 border-bottom'><span>Название: {album?.title}</span></p>
      <div className="position-relative h-300px">
        {statusOfLoading === LoadingStatuses.pending && <ThreeDotsSpinner />}
        {statusOfLoading === LoadingStatuses.fulfilled && (
          <Carousel className="h-100 d-flex align-items-center" interval={null} variant="dark">
            {photos.map((photo) => {
              if (!photo) return null;
              return (
                <Carousel.Item key={photo.id} >
                  <p className='title-page h5 border-bottom'><span>{photo.title}</span></p>
                  <img
                    className="mx-auto my-1 d-block"
                    width={150}
                    height={150}
                    src={photo.thumbnailUrl}
                    alt="slide"
                  />
                </Carousel.Item>
              );
            })}
            
          </Carousel>
        )}
        <BackgroundGlass />
      </div>
    </div>
  );
};
