import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectorsPosts } from '../../store/slices/Posts/dataPostsSlice';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';
import { actionsPosts } from '../../store/slices/Posts/dataPostsSlice';
import { useNavigate } from 'react-router-dom';
interface IPostId {
  id: number | string
}

export const CardOfPost: React.FC<IPostId> = ({ id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useAppSelector((store) => selectorsPosts.selectById(store, id));
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const activePostHandler = (postId: number | string) => () => {
    dispatch(actionsPosts.setActivePostId({id: postId}));
    navigate(`${id}`);
  }
  return (
    <>
    <div
      className="position-relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Card className="CardOfPost overflow-hidden">
        <Card.Body className="centered-content-by-flex">
          <Card.Title>{post?.title}</Card.Title>
          {/* <Card.Text>{post?.body}</Card.Text> */}
        </Card.Body>
      </Card>
      {isHovering && (
        <div className="cursor-pointer centered-content-by-position" onClick={activePostHandler(id)}>
          <div className="bg-light p-2 centered-content-by-flex border rounded fw-bold">Посмотреть</div>
        </div>
      )}
      <BackgroundGlass />
    </div>
    </>
  );
};
