import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGetPosts } from '../store/slices/Posts/fetchGetPosts';
import { selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { Outlet } from 'react-router-dom';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { LoadingStatuses } from '../utils/constants'; 

export const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activePostId, statusOfLoading } = useAppSelector((store) => store.dataPosts);
  const postIds = useAppSelector(selectorsPosts.selectIds);
  useEffect(() => {
    if (postIds.length === 0) dispatch(fetchGetPosts());
    // const timoutId = setTimeout(() => {dispatch(fetchGetPosts()}, 1000000);
    // return clearTimeout(timoutId);
  }, []);

  return (
    <section className="p-5 d-flex justify-content-end gap-2 flex-wrap">
      { statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
      {!activePostId && (statusOfLoading === LoadingStatuses.fulfilled) && postIds.map((postId) => <CardOfPost key={postId} id={postId} />)}
      {activePostId && <Outlet />}
    </section>
  );
};
