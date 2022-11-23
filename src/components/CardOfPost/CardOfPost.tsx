import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';
import { ViewMoreElement } from '../ViewMoreElement/ViewMoreElement';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsPosts, selectorsPosts } from '../../store/slices/Posts/dataPostsSlice';

import { IPost } from '../../store/slices/Posts/fetchPosts';

interface IProps {
  post: IPost;
}

export const CardOfPost: React.FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const id = post.id;

  const activePostHandler = (postId: number | string) => () => {
    dispatch(actionsPosts.setActivePostId({ id: postId }));
    navigate(`${id}`);
  };

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
          </Card.Body>
        </Card>

        {isHovering && <ViewMoreElement onClick={activePostHandler(id)} />}
        <BackgroundGlass />
      </div>
    </>
  );
};
