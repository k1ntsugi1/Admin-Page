import React from 'react';
import cn from 'classnames';
import Burger from '../../assets/svg/burger.svg';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsUiSidebar } from '../../store/slices/uiSidebarSlice';

import { sizesOfIcons } from '../../utils/constants';

interface IProps {
  className?: string;
  sizeOfToggler: 's' | 'm' | 'l';
}

export const SidebarToggler: React.FC<IProps> = ({ className, sizeOfToggler }) => {
  const dispatch = useAppDispatch();

  const { showState } = useAppSelector((state) => state.uiSidebar);

  const classNamesOfSidebarToggler = cn('sidebarToggler', className);

  const { width, height } = sizesOfIcons[sizeOfToggler];

  const showStateHandler = () => {
    const newShowState = showState === 'hidden' ? 'visible' : 'hidden';
    dispatch(actionsUiSidebar.toggleShowState({ showState: newShowState }));
  };

  return (
    <div className={classNamesOfSidebarToggler} onClick={showStateHandler}>
      <img src={Burger} width={width} height={height} className="mx-auto cursor-pointer hover" />
    </div>
  );
};
