import React, { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks'

import { fetchAlbums } from '../store/slices/Albums/fetchAlbums';

export const AlbumsPage: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAlbums());
    })

    return (
        <div className="contianer-page justify-content-center">
            hello
        </div>
    )
}