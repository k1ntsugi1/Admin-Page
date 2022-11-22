import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/slices/Posts/fetchPosts';
import { selectorsPosts } from '../store/slices/Posts/dataPostsSlice';
import { CardOfPost } from '../components/CardOfPost/CardOfPost';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { LoadingStatuses } from '../utils/constants';
import { Button } from 'react-bootstrap';

export const PostsPage: React.FC = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statusOfLoading } = useAppSelector((store) => store.dataPosts);
  const postIds = useAppSelector(selectorsPosts.selectIds);
  useEffect(() => {
    if (postIds.length === 0) dispatch(fetchPosts({ method: 'get' }));
  }, []);

  return (
    <section className="p-5 h-100 d-flex flex-column">
      <div className="w-100 d-flex flex-nowrap gap-3 justify-content-center">
        <Button
          variant=""
          className="border-bottom"
          onClick={() => {
            navigate('/posts/create');
          }}
        >
          Создать
        </Button>
      </div>
      <p className="my-3 pt-3 pb-4 h3 border-bottom d-flex justify-content-center">
        <span>Посты:</span>
      </p>
      {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
      <div className="d-flex justify-content-end gap-2 flex-wrap">
        {statusOfLoading === LoadingStatuses.fulfilled &&
          postIds.map((postId) => <CardOfPost key={postId} id={postId} />)}
      </div>
    </section>
  );
};
