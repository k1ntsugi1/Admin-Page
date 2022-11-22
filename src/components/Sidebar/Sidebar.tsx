import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../store/hooks';

import { sizesOfIcons } from '../../utils/constants';
import { toggleVisibilityhandler } from '../../utils/toggleVisibilityHandler';

import HomeLink from '../../assets/svg/home.svg';
import PostsLink from '../../assets/svg/stickies.svg';
import TasksLink from '../../assets/svg/task-list.svg';
import AlbumsLink from '../../assets/svg/card-image.svg';

interface IProps {
  sizeOfNavItems: 's' | 'm' | 'l';
}

export const Sidebar: React.FC<IProps> = ({ sizeOfNavItems }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { activePostId } = useAppSelector((store) => store.dataPosts);
  const { showState } = useAppSelector((state) => state.uiSidebar);

  const { width, height } = sizesOfIcons[sizeOfNavItems];

  const classNameOfSidebar = cn(
    'position-absolute start-0 top-0 z-index-1000 h-100 w-100px shadow-lg transition-opacity bg-white',
    {
      'opacity-0': showState === 'hidden',
      'opacity-100': showState === 'visible'
    }
  );
  const classNamesOfLinks = cn('mt-4 mx-auto cursor-pointer hover');

  const navigateHandler = (path: string) => () => {
    navigate(path);
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    toggleVisibilityhandler(sidebarRef, showState);
    if (showState === 'visible') sidebarRef.current.style.visibility = '';
  }, [showState]);

  return (
    <div className={classNameOfSidebar} ref={sidebarRef}>
      <div className="mt-5 d-flex flex-column justify-content-between gap-5">
        <img
          src={HomeLink}
          width={width}
          height={height}
          className={classNamesOfLinks}
          onClick={navigateHandler('/')}
        />
        <img
          src={PostsLink}
          width={width}
          height={height}
          className={classNamesOfLinks}
          onClick={navigateHandler(`/posts/${activePostId ? activePostId : ''}`)}
        />
        <img
          src={AlbumsLink}
          width={width}
          height={height}
          className={classNamesOfLinks}
          onClick={navigateHandler('/albums')}
        />
        <img
          src={TasksLink}
          width={width}
          height={height}
          className={classNamesOfLinks}
          onClick={navigateHandler('/todos')}
        />
      </div>
    </div>
  );
};
