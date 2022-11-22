import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actionsPosts, selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchGetComments } from '../store/slices/Comments/fetchGetComments';
import { selectCommentsByPostId } from '../store/slices/Comments/customSelectorsOfComments';
import { CardOfComment } from '../components/CardOfComment/CardOfComment';
import { LoadingStatuses } from '../utils/constants';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { actionsComments } from '../store/slices/Comments/dataCommentsSlice';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';
export const PostPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { postId }  = useParams();
  const navigate = useNavigate();
  const post = useAppSelector((store) => selectorsPosts.selectById(store, Number(postId)!));
  const comments = useAppSelector((store) => selectCommentsByPostId(store, Number(postId)!));
  const { statusOfLoading, postIdsOfLoadedComments } = useAppSelector(
    (store) => store.dataComments
  );
  const moveToNewPagePageHandler = (path: string) => () => {
    dispatch(actionsPosts.setActivePostId({ id: null }));
    navigate(path);
  };
  useEffect(() => {
    if (!postId || postIdsOfLoadedComments.includes(Number(postId))) return;
    dispatch(fetchGetComments(postId));
    dispatch(actionsComments.addPostId({ id: Number(postId) }));
  }, []);
  useEffect(() => {
    return () => {dispatch(actionsPosts.setActivePostId({ id: null }))};
  }, [])
  return (
    <div className="h-100 p-5">
      <div className="d-flex flex-nowrap gap-3 justify-content-center">
        <Button variant="" className="border-bottom" onClick={moveToNewPagePageHandler('/posts')}>
          К постам
        </Button>
        <Button variant="" className="border-bottom" onClick={moveToNewPagePageHandler('edit')}>
          Редактировать
        </Button>
      </div>
      <p className="my-3 pt-3 pb-4 h3 border-bottom d-flex justify-content-center"><span>Пост:</span></p>
      <div>
        <div className="position-relative p-3 border rounded">
          <p className="h3">{post?.title}</p>
          <p>{post?.body}</p>
          <BackgroundGlass />
        </div>
        <div className="d-flex flex-column">
          <p className="my-3 pt-3 pb-4 h3 border-bottom d-flex justify-content-center"><span>Комментарии:</span></p>
          {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
          {statusOfLoading === LoadingStatuses.fulfilled &&
            comments.length > 0 &&
            comments.map((comment) => {
              if (!comment) return null;
              return <CardOfComment key={comment.id} comment={comment} />;
            })}
        </div>
      </div>
    </div>
  );
};
