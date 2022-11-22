import React from 'react';
import cn from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { actionsNotification } from '../../store/slices/uiNotificationSlice';


export const Notification: React.FC = () => {
 const  { message, statusOfVisibility, type } = useAppSelector(store => store.uiNotification)

  const appDispatch = useAppDispatch();

  const classnamesOfParentContainer = cn('notification bg-white', {
    'notification-success': type === 'success' ? true : false,
    'notification-error': type === 'error' ? true : false,
    show: statusOfVisibility === 'visible' ? true : false
  });

  useEffect(() => {
    const id = setTimeout(() => {
      appDispatch(actionsNotification.hide());
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div className={classnamesOfParentContainer}>
      <div className="notification-content">{message}</div>
    </div>
  );
};
