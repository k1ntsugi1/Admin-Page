import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import HomeLink from '../../assets/svg/home.svg';
import PostsLink from '../../assets/svg/stickies.svg';
import TasksLink from '../../assets/svg/task-list.svg';
import AlbumsLink from '../../assets/svg/card-image.svg';
import { sizesOfIcons } from '../../utils/constants';
import { useAppSelector } from '../../store/hooks';
interface IProps {
  sizeOfNavItems: 's' | 'm' | 'l';
}

export const Sidebar: React.FC<IProps> = ({ sizeOfNavItems }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { showState } = useAppSelector((state) => state.uiSidebar);
  const classNameOfSidebar = cn(
    'position-absolute start-0 top-0 z-index-1000 h-100 w-100px shadow-lg transition-opacity',
    {
      'opacity-0': showState === 'hidden',
      'opacity-100': showState === 'visible'
    }
  );

  const classNamesOfLinks = cn('mt-4 mx-auto cursor-pointer hover');
  const { width: navItemWidth, height: navItemHeight } = sizesOfIcons[sizeOfNavItems];

  useEffect(() => {
    setTimeout(() => {
      if (showState === 'hidden') sidebarRef.current!.style.visibility = 'hidden';
    }, 400);
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
        />
        <img
          src={PostsLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
        />
        <img
          src={AlbumsLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
        />
        <img
          src={TasksLink}
          width={navItemWidth}
          height={navItemHeight}
          className={classNamesOfLinks}
        />
      </div>
    </div>
  );
};
