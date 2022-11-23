import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { deletePost } from '../../store/slices/Posts/deletePost';
import { actionsNotification } from '../../store/slices/uiNotificationSlice';

import { sizesOfIcons } from '../../utils/constants';

import DeleteIcon from '../../assets/svg/delete.svg';

export const DeletePostElement: React.FC<{ postId: string | number }> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { width, height } = sizesOfIcons.s;

    const deletePostHandler = () => {
        dispatch(actionsNotification.show({ message: 'Подождите...', type: 'success' }));
        dispatch(deletePost(postId));
        navigate('/posts')
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
