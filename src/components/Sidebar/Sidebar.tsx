import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom'
import HomeLink from '../../assets/svg/home.svg';
import PostsLink from '../../assets/svg/stickies.svg';
import TasksLink from '../../assets/svg/task-list.svg';
import AlbumsLink from '../../assets/svg/card-image.svg';
import { sizesOfIcons } from '../../utils/constants';
import { useAppSelector } from '../../store/hooks';
import { toggleVisibilityhandler } from '../../utils/toggleVisibilityHandler';
interface IProps {
  sizeOfNavItems: 's' | 'm' | 'l';
}

export const Sidebar: React.FC<IProps> = ({ sizeOfNavItems }) => {
  const navigate = useNavigate();
  const { activePostId } = useAppSelector(store => store.dataPosts);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { showState } = useAppSelector((state) => state.uiSidebar);
  const classNameOfSidebar = cn(
    'position-absolute start-0 top-0 z-index-1000 h-100 w-100px shadow-lg transition-opacity bg-white',
    {
      'opacity-0': showState === 'hidden',
      'opacity-100': showState === 'visible'
    }
  );

  const classNamesOfLinks = cn('mt-4 mx-auto cursor-pointer hover');
  const { width: navItemWidth, height: navItemHeight } = sizesOfIcons[sizeOfNavItems];
  const navigateHandler = (path: string) => () => {
    navigate(path)
  }
  useEffect(() => {
    toggleVisibilityhandler(sidebarRef, showState);
    if (showState === 'visible') sidebarRef.current!.style.visibility = '';
  }, [showState]);
  return (
    <div className={classNameOfSidebar} ref={sidebarRef}>
      <div className="mt-5 d-flex flex-column justify-content-between gap-5">
        <img
          src={HomeLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
          onClick={navigateHandler('/')}
        />
        <img
          src={PostsLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
          onClick={navigateHandler(`/posts/${activePostId ? activePostId: ''}`)}
        />
        <img
          src={AlbumsLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
          onClick={navigateHandler('/albums')}
        />
        <img
          src={TasksLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
          onClick={navigateHandler('/todos')}
        />
      </div>
    </div>
  );
};
