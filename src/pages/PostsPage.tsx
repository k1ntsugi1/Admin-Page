import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/slices/Posts/fetchPosts';
import { selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { Outlet, useParams } from 'react-router-dom';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { LoadingStatuses } from '../utils/constants'; 
import { Button } from 'react-bootstrap';

export const PostsPage: React.FC = () => {
  const { postId }  = useParams();
  const dispatch = useAppDispatch();
  const { statusOfLoading } = useAppSelector((store) => store.dataPosts);
  const postIds = useAppSelector(selectorsPosts.selectIds);
  useEffect(() => {
    if (postIds.length === 0) dispatch(fetchPosts({method: 'get'}));
  }, []);

  return (
    <section className="p-5 h-75 d-flex justify-content-end gap-2 flex-wrap">
      { statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
      {!postId && (statusOfLoading === LoadingStatuses.fulfilled) && postIds.map((postId) => <CardOfPost key={postId} id={postId} />)}
      {postId && <Outlet />}
    </section>
  );
};
