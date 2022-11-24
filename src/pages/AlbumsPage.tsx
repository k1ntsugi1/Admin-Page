import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { CardOfAlbum } from '../components/CardOfAlbum/CardOfAlbum';
import { NavBtnsOfPage } from '../components/NavBtnsOfPage/NavBtnsOfPage';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbums } from '../store/slices/Albums/fetchAlbums';
import { selectAlbumsByTitle } from '../store/slices/Albums/customSelectorsOfAlbums';

import { dataOfNavBtns } from '../utils/constants';

import { LoadingStatuses } from '../utils/constants';
import { actionsAlbums } from '../store/slices/Albums/dataAlbumsSlice';
import { useNavigate } from 'react-router-dom';

export const AlbumsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState<string>('');

  const { userId } = useAppSelector((store) => store.dataUser);
  const albums = useAppSelector((store) => selectAlbumsByTitle(store, searchString));
  const { statusOfLoading, userIdsWithLoadedAlbums, allAlbumsAreLoaded } = useAppSelector(
    (store) => store.dataAlbums
  );

  const performedСonditionOfFetchAlbums =
    (userId && !userIdsWithLoadedAlbums.includes(userId)) || (!userId && !allAlbumsAreLoaded);

  const setSearchStringHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  };

  const moveToNewPagePageHandler = (path: string) => () => {
    navigate(path);
  };

  useEffect(() => {
    if (performedСonditionOfFetchAlbums) dispatch(fetchAlbums({ method: 'get' }));
  }, [userId]);

  return (
    <div className="contianer-page">
      <NavBtnsOfPage btns={dataOfNavBtns.albumsPage} onClickHandler={moveToNewPagePageHandler} />
      <Form.Control
        className="mt-4"
        type="text"
        name="posts by title"
        value={searchString}
        onChange={setSearchStringHandler}
        aria-label="search by post title"
        placeholder="Поиск поста"
      />

      <TitleOfPage title={`Альбомы | Пользователь ${userId === null ? 'Все' : userId}`} />
      {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}

      {statusOfLoading === LoadingStatuses.fulfilled && (
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {albums.map((album) => {
            return <CardOfAlbum key={album.id} album={album} />;
          })}
        </div>
      )}
    </div>
  );
};
