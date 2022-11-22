import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavBtnsOfPage } from '../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/slices/Posts/fetchPosts';
import { selectorsPosts } from '../store/slices/Posts/dataPostsSlice';

import { LoadingStatuses, dataOfNavBtns } from '../utils/constants';

export const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postIds = useAppSelector(selectorsPosts.selectIds);
  const { statusOfLoading } = useAppSelector((store) => store.dataPosts);

  const moveToNewPagePageHandler = (path: string) => () => {
    navigate(path);
  };

  useEffect(() => {
    if (postIds.length === 0) dispatch(fetchPosts({ method: 'get' }));
  }, []);

  return (
    <section className="contianer-page">
      <NavBtnsOfPage
        btns={dataOfNavBtns.postsPage}
        onClickHandler={moveToNewPagePageHandler}
      />

      <TitleOfPage title="Посты:" />

      {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}

      {statusOfLoading === LoadingStatuses.fulfilled && (
        <div className="d-flex justify-content-end gap-2 flex-wrap">
          {postIds.map((postId) => (
            <CardOfPost key={postId} id={postId} />
          ))}
        </div>
      )}
    </section>
  );
};
