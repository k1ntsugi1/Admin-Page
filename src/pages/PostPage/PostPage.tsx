import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HeaderOfPage } from '../../components/HeaderOfPage/HeaderOfPage';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';
import { DeleteElement } from '../../components/DeleteElement/DeleteElement';
import { CardOfComment } from '../../components/CardOfComment/CardOfComment';
import { UpdateCommentElement } from '../../components/UpdateCommentElement/UpdateCommentElement';
import { ThreeDotsSpinner } from '../../components/ThreeDotsSpinner/ThreeDotsSpinner';
import { BackgroundGlass } from '../../components/BackgroundGlass/BackgroundGlass';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsPosts, selectorsPosts } from '../../store/slices/dataPosts/dataPostsSlice';
import { selectCommentsByPostId } from '../../store/slices/dataComments/customSelectorsOfComments';
import { actionsComments } from '../../store/slices/dataComments/dataCommentsSlice';
import { fetchComments } from '../../store/slices/dataComments/fetchComments';
import { fetchPosts } from '../../store/slices/dataPosts/fetchPosts';
import { fetchUsers } from '../../store/slices/dataUser/fetchUsers';

import { LoadingStatuses } from '../../constants/LoadingStatuses';



export const PostPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const { statusOfLoading: statusOfLoadingUsers, ids: usersIds } = useAppSelector((store) => store.dataUser)
  const post = useAppSelector((store) => selectorsPosts.selectById(store, Number(postId)!));
  const comments = useAppSelector((store) => selectCommentsByPostId(store, Number(postId)!));
  const { statusOfLoading: statusOfPostLoading } = useAppSelector((store) => store.dataPosts);
  const {
    statusOfLoading: statusOfCommentsLoading,
    postIdsOfLoadedComments,
    methodOfFetch
  } = useAppSelector((store) => store.dataComments);

  const navigateHandler = (path: string) => () => {
    dispatch(actionsPosts.setActivePostId({ id: null }));
    navigate(path);
  };

  useEffect(() => {
    if (!postId || postIdsOfLoadedComments.includes(Number(postId))) return;
    if (!post) dispatch(fetchPosts({ method: 'get', postId: Number(postId) })); // типо бага, нужно исправить upd - или нет, подумать надо
    if (post && !usersIds.includes(post.userId)) dispatch(fetchUsers({method: 'get', userId: post.userId}));
    dispatch(fetchComments({ method: 'get', postId: Number(postId) }));
    dispatch(actionsComments.addPostId({ id: Number(postId) }));
  }, []);

  return (
    <div className="contianer-page">
      <HeaderOfPage title="Пост" nameOfPage="postPage" navigateParams={{ navigateHandler }} />
      <div>
        {statusOfPostLoading === LoadingStatuses.pending && <ThreeDotsSpinner />}
        {statusOfPostLoading === LoadingStatuses.fulfilled && (
          <div className="position-relative p-3 border rounded">
            <div className="p-1 d-flex justify-content-end border-bottom">
              <DeleteElement
                itemId={Number(postId!)}
                pathToNextPage="/posts"
                typeOfElement="post"
              />
            </div>

            <p className="h3">{post?.title}</p>
            <p>{post?.body}</p>
            <BackgroundGlass />
          </div>
        )}

        <div className="d-flex flex-column">
          <TitleOfPage title="Комментарии" className="h4" />
          {statusOfLoadingUsers === LoadingStatuses.pending &&  <ThreeDotsSpinner />}
          {statusOfLoadingUsers === LoadingStatuses.fulfilled && <UpdateCommentElement />}
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
