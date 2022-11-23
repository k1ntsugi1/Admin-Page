import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { ViewMoreElement } from '../ViewMoreElement/ViewMoreElement';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';

import { useAppDispatch } from '../../store/hooks';
import { actionsAlbums } from '../../store/slices/Albums/dataAlbumsSlice';
import { IAlbum } from '../../store/slices/Albums/fetchAlbums';

interface IProps {
  album: IAlbum;
}

export const CardOfAlbum: React.FC<IProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const id = album.id;

  const activeAlbumHandler = (albumId: number) => () => {
    dispatch(actionsAlbums.setActiveAlbumId({ id: albumId }));
    navigate(`${id}/photos`);
  };

  return (
    <div
      className="position-relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Card className="CardOfPost overflow-hidden">
        <Card.Body className="centered-content-by-flex">
          <Card.Title>{album?.title}</Card.Title>
          {isHovering && <ViewMoreElement onClick={activeAlbumHandler(id!)} />}
        </Card.Body>
      </Card>

      <BackgroundGlass />
    </div>
  );
};
