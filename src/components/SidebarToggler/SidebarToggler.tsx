import React from 'react';
import cn from 'classnames';
import Burger from '../../assets/svg/burger.svg';
import { sizesOfIcons } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsUiSidebar } from '../../store/slices/uiSidebarSlice';
interface IProps {
  className?: string;
  sizeOfToggler: 's' | 'm' | 'l';
}

export const SidebarToggler: React.FC<IProps> = ({ className, sizeOfToggler }) => {
  const { showState } = useAppSelector((state) => state.uiSidebar);
  const dispatch = useAppDispatch();
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
