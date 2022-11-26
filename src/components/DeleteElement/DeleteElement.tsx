import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { deletePost, TDeletePost } from '../../store/slices/dataPosts/deletePost';
import { deleteAlbum, TDeleteAlbum } from '../../store/slices/dataAlbums/deleteAlbum';
import { deleteComment, TDeleteComment } from '../../store/slices/dataComments/deleteComment';
import { deleteTask, TDeleteTask } from '../../store/slices/dataTodos/deleteTask';
import { deletePhoto, TDeletePhoto } from '../../store/slices/dataPhotos/deletePhoto'; 

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import DeleteIcon from '../../assets/svg/delete.svg';

interface IProps {
  itemId: number;
  typeOfElement: 'album' | 'post' | 'comment' | 'task' | 'photo';
  pathToNextPage?: string;
  size?: 'xs'| 's' | 'm' | 'l';
}

interface IMappingThunk {
  [index: string]: TDeletePost | TDeleteAlbum | TDeleteComment | TDeleteTask | TDeletePhoto;
}

const mappingThunk: IMappingThunk = {
  album: deleteAlbum,
  post: deletePost,
  comment: deleteComment,
  task: deleteTask,
  photo: deletePhoto
};

export const DeleteElement: React.FC<IProps> = (props) => {
  const { itemId, typeOfElement, pathToNextPage, size = 'xs' } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { width, height } = SizesOfIcons[size];

  const deletePostHandler = () => {
    const thunkOfDeleting = mappingThunk[typeOfElement];
    dispatch(thunkOfDeleting(itemId));
    if (pathToNextPage) navigate(pathToNextPage, { replace: true });
  };

  return (
    <img
      className="cursor-pointer hover"
      src={DeleteIcon}
      width={width}
      height={height}
      alt="deleteIcon"
      onClick={deletePostHandler}
    />
  );
};
