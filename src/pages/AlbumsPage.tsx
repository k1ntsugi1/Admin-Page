import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardOfAlbum } from '../components/CardOfAlbum/CardOfAlbum';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { HeaderOfPage } from '../components/HeaderOfPage/HeaderOfPage';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbums } from '../store/slices/Albums/fetchAlbums';
import { selectAlbumsByTitle } from '../store/slices/Albums/customSelectorsOfAlbums';

import { LoadingStatuses } from '../utils/constants';

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

  const navigateHandler = (path: string) => () => {
    navigate(path);
  };

  useEffect(() => {
    if (performedСonditionOfFetchAlbums) dispatch(fetchAlbums({ method: 'get' }));
  }, [userId]);

  return (
    <div className="contianer-page">
      <HeaderOfPage
        title="Альбомы"
        nameOfPage="albumsPage"
        searchParams={{ searchString, setSearchString }}
        navigateParams={{ navigateHandler }}
      />
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
