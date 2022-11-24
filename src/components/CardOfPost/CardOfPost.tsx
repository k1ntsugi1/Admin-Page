import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { DeleteElement } from '../DeleteElement/DeleteElement';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';
import { ViewMoreElement } from '../ViewMoreElement/ViewMoreElement';

import { useAppDispatch } from '../../store/hooks';
import { actionsPosts } from '../../store/slices/Posts/dataPostsSlice';

import { IPost } from '../../store/slices/Posts/fetchPosts';

interface IProps {
  post: IPost;
}

export const CardOfPost: React.FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const id = post.id;

  const activePostHandler = (postId: number) => () => {
    dispatch(actionsPosts.setActivePostId({ id: postId }));
    navigate(`${id}`);
  };

  return (
    <div
      className="position-relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Card className="CardOfPost overflow-hidden">
        <DeleteElement itemId={id} pathToNextPage="/posts" typeOfElement="post"/>

        <Card.Body className="centered-content-by-flex">
          <Card.Title>{post?.title}</Card.Title>
          {isHovering && <ViewMoreElement onClick={activePostHandler(id)} />}
        </Card.Body>
      </Card>

      <BackgroundGlass />
    </div>
  );
};
