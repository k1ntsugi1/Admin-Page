import React, { RefObject, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { CircleScrollProgressbar } from '../CircleScrollProgressbar/CircleScrollProgressbar';
import { StraightScrollProgressbar } from '../StraightScrollProgressbar/StraightScrollProgressbar';
import { ScrollIntoViewElement } from '../ScrollIntoViewElement/ScrollIntoViewElement';
import { SettingElement } from '../SettingElement/SettingElement';

import { useAppSelector } from '../../store/hooks';

import { toggleVisibilityhandler } from '../../utils/toggleVisibilityHandler';

import SettingIcon from '../../assets/svg/setting.svg';

export const ElementOfScrollProgress: React.FC<{
  elementOfBreakPoint?: RefObject<HTMLDivElement>;
}> = ({ elementOfBreakPoint }) => {
  const { pathname } = useLocation();
  const settingElementRef = useRef<HTMLDivElement>(null);

  const [showStateOfSettingElement, setShowStateOfSettingElement] = useState<string>('hidden');

  const classNamesOfSettingElement = cn('transition-opacity', {
    'opacity-0': showStateOfSettingElement === 'hidden',
    'opacity-100': showStateOfSettingElement === 'visible'
  });


  const { percentOfFilling, typeOfProgressBar } = useAppSelector((store) => store.uiProgressbar);
  

  const setShowStateOfSettingElementHandler = () => {
    const newShowStateOfSettingElement =
      showStateOfSettingElement === 'hidden' ? 'visible' : 'hidden';
    setShowStateOfSettingElement(newShowStateOfSettingElement);
  };

  useEffect(() => {
    toggleVisibilityhandler(settingElementRef, showStateOfSettingElement);
  }, [showStateOfSettingElement]);

  return (
    <div className="info-section">
      {pathname.match(/^\/[a-z0-9/]+/gi) &&
        (typeOfProgressBar === 'circle' ? (
          <CircleScrollProgressbar />
        ) : (
          <StraightScrollProgressbar />
        ))}

      {elementOfBreakPoint && percentOfFilling > 10 && (
        <ScrollIntoViewElement elementOfBreakPoint={elementOfBreakPoint} />
      )}
      <div className="p-1 position-relative">
        <img className="hover" src={SettingIcon} width="25" height="25" onClick={setShowStateOfSettingElementHandler}/>
        <div className={classNamesOfSettingElement} ref={settingElementRef}>
          <SettingElement />
        </div>
      </div>
    </div>
  );
};
