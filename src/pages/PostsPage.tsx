import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGetPosts } from '../store/slices/Posts/fetchGetPosts';
import { selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { Outlet } from 'react-router-dom';

export const PostsPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const { activePostId } = useAppSelector((store) => store.dataPosts);
  const postIds = useAppSelector(selectorsPosts.selectIds);
  useEffect(() => {
    if (postIds.length === 0) dispatch(fetchGetPosts());
    // const timoutId = setTimeout(() => {dispatch(fetchGetPosts()}, 1000000);
    // return clearTimeout(timoutId);
  }, []);

  return (
    <section className="p-5 d-flex justify-content-end gap-2 flex-wrap">
      {!activePostId ? postIds.map((postId) => <CardOfPost key={postId} id={postId} />) : <Outlet />}
    </section>
  );
};
