import React, { useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { PostsPage } from '../pages/PostsPage';
import { PostPage } from '../pages/PostPage';
import { UpdatePostPage } from '../pages/UpdatePostPage/UpdatePostPage';
import { AlbumsPage } from '../pages/AlbumsPage';
import { AlbumPage } from '../pages/AlbumPage';
import { UpdateAlbumPage } from '../pages/UpdateAlbumPage.tsx/UpdateAlbumPage.tsx';
import { TodosPage } from '../pages/TodosPage';

import { ElementOfScrollProgress } from '../components/ElementOfScrollProgress/ElementOfScrollProgress';

import { BackgroundCircles } from '../components/BackgroundCircles/BackgroundCircles';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';

import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarToggler } from '../components/SidebarToggler/SidebarToggler';

import { Notification } from '../components/Notifications/Notifications';
import { ModalInfo } from '../components/ModalInfo/ModalInfo';

import { useAppDispatch } from '../store/hooks';

import { scrollHandler } from '../utils/scrollHandler';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const upperBlockRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollElementRef.current) return;

    const scrollElement = scrollElementRef.current;

    scrollHandler(scrollElement, dispatch);

    const scrollListener = () => {
      scrollHandler(scrollElement, dispatch);
    };

    scrollElement.addEventListener('scroll', scrollListener);
    return () => {
      scrollElement.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="vh-100 vw-100 overflow-hidden">
      <div className="h-100 w-100 overflow-auto" ref={scrollElementRef}>
        <div className="w-100 h-1px" ref={upperBlockRef}></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create" element={<UpdatePostPage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/posts/:postId/edit" element={<UpdatePostPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/create" element={<UpdateAlbumPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/albums/:albumId/edit" element={<UpdateAlbumPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>

        {!pathname.match(/create|edit|(albums\/[0-9])/gi) && (
          <ElementOfScrollProgress elementOfBreakPoint={upperBlockRef} />
        )}
      </div>

      <Sidebar sizeOfNavItems="s" />
      <SidebarToggler sizeOfToggler="m" />

      {/* <ModalInfo /> */}
      <Notification />
    </div>
  );
};
