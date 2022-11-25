import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { deletePost, TDeletePost } from '../../store/slices/Posts/deletePost';
import { deleteAlbum, TDeleteAlbum } from '../../store/slices/Albums/deleteAlbum';
import { deleteComment, TDeleteComment } from '../../store/slices/Comments/deleteComment';
import { deleteTask, TDeleteTask } from '../../store/slices/Todos/deleteTask';
import { actionsNotification } from '../../store/slices/uiNotificationSlice';

import { sizesOfIcons } from '../../utils/constants';

import DeleteIcon from '../../assets/svg/delete.svg';

interface IProps {
  itemId: number,
  typeOfElement: 'album' | 'post' | 'comment' | 'task',
  pathToNextPage?: string,
}

interface IMappingThunk {
  [index: string]: TDeletePost | TDeleteAlbum | TDeleteComment | TDeleteTask,
}

const mappingThunk: IMappingThunk = {
  album: deleteAlbum,
  post: deletePost,
  comment: deleteComment,
  task: deleteTask
  
}

export const DeleteElement: React.FC<IProps> = ({ itemId, typeOfElement, pathToNextPage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { width, height } = sizesOfIcons.s;

    const deletePostHandler = () => {
        dispatch(actionsNotification.show({ message: 'Подождите...', type: 'success' }));
        const thunkOfDeleting = mappingThunk[typeOfElement];
        dispatch(thunkOfDeleting(itemId));
        if (pathToNextPage) navigate(pathToNextPage, {replace: true})
    }

  return (
    <div className="d-flex justify-content-end">
      <img
        className="m-3 cursor-pointer hover"
        src={DeleteIcon}
        width={width}
        height={height}
        alt="deleteIcon"
        onClick={deletePostHandler}
      />
    </div>
  );
};
