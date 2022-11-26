import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderOfPage } from '../../components/HeaderOfPage/HeaderOfPage';
import { CardOfPost } from '../../components/CardOfPost/CardOfPost';
import { MagnifyingGlassSpinner } from '../../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPostsByTitle } from '../../store/slices/dataPosts/customSelectorsOfPosts';
import { fetchPosts } from '../../store/slices/dataPosts/fetchPosts';

import { LoadingStatuses } from '../../constants/LoadingStatuses';

export const PostsPage: React.FC = () => {
  const navigate = useNavigate(); 
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState<string>('');

  const { userId } = useAppSelector((store) => store.dataUser);
  const posts = useAppSelector((store) => selectPostsByTitle(store, searchString));
  const { statusOfLoading, userIdsWithLoadedPosts, allPostsAreLoaded } = useAppSelector(
    (store) => store.dataPosts
  );

  const performedСonditionOfFetchPosts =
    (userId && !userIdsWithLoadedPosts.includes(userId)) || (!userId && !allPostsAreLoaded);

  const navigateHandler = (path: string) => () => {
    navigate(path);
  };

  useEffect(() => {
    if (performedСonditionOfFetchPosts) dispatch(fetchPosts({ method: 'get' }));
  }, [userId]);

  return (
    <section className="contianer-page">
      <HeaderOfPage
        title="Посты"
        nameOfPage="postsPage"
        searchParams={{ searchString, setSearchString }}
        navigateParams={{navigateHandler}}
      />

      {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}

      {statusOfLoading === LoadingStatuses.fulfilled && (
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {posts.map((post) => (
            <CardOfPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};
