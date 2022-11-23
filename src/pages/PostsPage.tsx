import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { NavBtnsOfPage } from '../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectPostsByTitle } from '../store/slices/Posts/customSelectorsOfPosts';
import { fetchPosts } from '../store/slices/Posts/fetchPosts';

import { LoadingStatuses, dataOfNavBtns } from '../utils/constants';

export const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState<string>('');

  const posts = useAppSelector((store) => selectPostsByTitle(store, searchString))
  const { statusOfLoading } = useAppSelector((store) => store.dataPosts);

  const moveToNewPagePageHandler = (path: string) => () => {
    navigate(path);
  };

  const setSearchStringHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  }

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts({ method: 'get' }));
  }, []);

  return (
    <section className="contianer-page">
      <NavBtnsOfPage btns={dataOfNavBtns.postsPage} onClickHandler={moveToNewPagePageHandler} />

      <Form.Control
        className="mt-4"
        type="text"
        name="posts by title"
        value={searchString}
        onChange={setSearchStringHandler}
        aria-label="search by post title"
        placeholder="Поиск поста"
      />

      <TitleOfPage title="Посты:" />

      {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}

      {statusOfLoading === LoadingStatuses.fulfilled && (
        <div className="d-flex justify-content-end gap-2 flex-wrap">
          {posts.map((post) => (
            <CardOfPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};
