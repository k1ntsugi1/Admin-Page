import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { DeleteElement } from '../DeleteElement/DeleteElement';
import { ViewMoreElement } from '../ViewMoreElement/ViewMoreElement';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';

import { useAppDispatch } from '../../store/hooks';
import { actionsAlbums } from '../../store/slices/dataAlbums/dataAlbumsSlice';
import { actionsUser } from '../../store/slices/dataUser/dataUserSlice';

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import EditIcon from '../../assets/svg/edit.svg'

import { IAlbum } from '../../store/slices/dataAlbums/fetchAlbums';

interface IProps {
  album: IAlbum;
}

export const CardOfAlbum: React.FC<IProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {width, height } = SizesOfIcons.xs
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const id = album.id;

  const activeAlbumHandler = (albumId: number, userId: number) => () => {
    dispatch(actionsAlbums.setActiveAlbumId({ id: albumId }));
    dispatch(actionsUser.setUserId({id: userId}));
    navigate(`${id}`);
  };

  return (
    <div
      className="position-relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Card className="default-card overflow-hidden">
      <div className="p-2 d-flex justify-content-end gap-2 border-bottom ">
          <DeleteElement itemId={id} pathToNextPage="/albums" typeOfElement="album" />
          <img
                className="hover cursor-pointer"
                src={EditIcon}
                width={width}
                height={height}
                alt="editIcon"
                onClick={() => {navigate(`${id}/edit`)}}
              />
        </div>

        <Card.Body className="centered-content-by-flex">
          <Card.Title>{album?.title}</Card.Title>
          {isHovering && <ViewMoreElement onClick={activeAlbumHandler(id, album.userId)} />}
        </Card.Body>
      </Card>

      <BackgroundGlass />
    </div>
  );
};
