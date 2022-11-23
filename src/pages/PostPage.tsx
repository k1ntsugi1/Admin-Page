import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NavBtnsOfPage } from '../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { DeletePostElement } from '../components/DeletePostElement/DeletePostElement';
import { CardOfComment } from '../components/CardOfComment/CardOfComment';
import { UpdateCommentElement } from '../components/UpdateCommentElement/UpdateCommentElement';
import { ThreeDotsSpinner } from '../components/ThreeDotsSpinner/ThreeDotsSpinner';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actionsPosts, selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { selectCommentsByPostId } from '../store/slices/Comments/customSelectorsOfComments';
import { actionsComments } from '../store/slices/Comments/dataCommentsSlice';
import { fetchComments } from '../store/slices/Comments/fetchComments';
import { fetchPosts } from '../store/slices/Posts/fetchPosts';

import { dataOfNavBtns, LoadingStatuses } from '../utils/constants';

export const PostPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = useAppSelector((store) => selectorsPosts.selectById(store, Number(postId)!));
  const comments = useAppSelector((store) => selectCommentsByPostId(store, Number(postId)!));
  const { statusOfLoading: statusOfPostLoading } = useAppSelector((store) => store.dataPosts);
  const {
    statusOfLoading: statusOfCommentsLoading,
    postIdsOfLoadedComments,
    methodOfFetch
  } = useAppSelector((store) => store.dataComments);

  const moveToNewPagePageHandler = (path: string) => () => {
    dispatch(actionsPosts.setActivePostId({ id: null }));
    navigate(path);
  };

  useEffect(() => {
    if (!postId || postIdsOfLoadedComments.includes(Number(postId))) return;
    if (!post) dispatch(fetchPosts({ method: 'get', postId: Number(postId) }));
    dispatch(fetchComments({ method: 'get', postId: Number(postId) }));
    dispatch(actionsComments.addPostId({ id: Number(postId) }));
  }, []);

  return (
    <div className="contianer-page">
      <NavBtnsOfPage btns={dataOfNavBtns.postPage} onClickHandler={moveToNewPagePageHandler} />
      <TitleOfPage title="Пост" />
      <div>
        {statusOfPostLoading === LoadingStatuses.pending && <ThreeDotsSpinner />}
        {statusOfPostLoading === LoadingStatuses.fulfilled && (
          <div className="position-relative p-3 border rounded">
            <DeletePostElement postId={postId!}/>
            <p className="h3">{post?.title}</p>
            <p>{post?.body}</p>
            <BackgroundGlass />
          </div>
        )}

        <div className="d-flex flex-column">
          <TitleOfPage title="Комментарии" />
          <UpdateCommentElement />
          {statusOfCommentsLoading === LoadingStatuses.pending && methodOfFetch === 'get' && (
            <ThreeDotsSpinner />
          )}
          {(statusOfCommentsLoading === LoadingStatuses.fulfilled ||
            (statusOfCommentsLoading === LoadingStatuses.pending && methodOfFetch !== 'get')) && (
              <div className="position-relative w-100 h-100">
                {comments.map((comment) => {
                  if (!comment) return null;
                  return <CardOfComment key={comment.id} comment={comment} />;
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
