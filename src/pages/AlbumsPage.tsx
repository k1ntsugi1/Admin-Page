import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { CardOfAlbum } from '../components/CardOfAlbum/CardOfAlbum';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbums } from '../store/slices/Albums/fetchAlbums';
import { selectAlbumsByTitle } from '../store/slices/Albums/customSelectorsOfAlbums'; 

import { LoadingStatuses } from '../utils/constants';

export const AlbumsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState<string>('');

  const albums = useAppSelector((store) => selectAlbumsByTitle(store, searchString))
  const { statusOfLoading } = useAppSelector((store) => store.dataAlbums);

  const setSearchStringHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  }

  useEffect(() => {
    if (statusOfLoading === LoadingStatuses.idle) dispatch(fetchAlbums({method: 'get'}));
  });

  return (
    <div className="contianer-page">

      <Form.Control
        className="mt-4"
        type="text"
        name="posts by title"
        value={searchString}
        onChange={setSearchStringHandler}
        aria-label="search by post title"
        placeholder="Поиск поста"
      />

       <TitleOfPage title="Альбомы:" />
       {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
       
       {statusOfLoading === LoadingStatuses.fulfilled && (
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {albums.map((album) => {
        return <CardOfAlbum key={album.id} album={album}/>
       })}
        </div>
      )}
       
    </div>
  );
};
