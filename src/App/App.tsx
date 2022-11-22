import React, { useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BackgroundCircles } from '../components/BackgroundCircles/BackgroundCircles';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarToggler } from '../components/SidebarToggler/SidebarToggler';
import { HomePage } from '../pages/HomePage';
import { PostsPage } from '../pages/PostsPage';
import { ElementOfScrollProgress } from '../components/ElementOfScrollProgress/ElementOfScrollProgress';
import { useAppDispatch } from '../store/hooks';
import { scrollHandler } from '../utils/scrollHandler';
export const App: React.FC = () => {
  const upperBlockRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const scrollElement = scrollElementRef.current!;

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
      <Sidebar sizeOfNavItems="s" />
      <SidebarToggler sizeOfToggler="m" />
      <div className="h-100 w-100 overflow-auto" ref={scrollElementRef}>
        <div className="w-100" style={{ height: '1px' }} ref={upperBlockRef}></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />}>
            <Route path=":postId" element={<div>hello</div>}></Route>
          </Route>
        </Routes>
        <ElementOfScrollProgress elementOfBreakPoint={upperBlockRef} />
      </div>
      {/* <BackgroundCircles /> */}
      <BackgroundGlass />
    </div>
  );
};
