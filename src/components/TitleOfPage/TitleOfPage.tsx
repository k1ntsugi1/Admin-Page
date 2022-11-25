import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../store/hooks';

import { LoadingStatuses } from '../../utils/constants';

interface IProps {
  title: string;
  className?: string;
}

export const TitleOfPage: React.FC<IProps> = ({ title, className }) => {
  
  const textRef = useRef<HTMLSpanElement>(null);
  const plug = 'Либо 25-ый кадр, либо мы ждем выполнения микротасок :)';
  const { pending } = LoadingStatuses;

  const { userId } = useAppSelector((store) => store.dataUser)
  const textOfTitle = `${title} | Пользователь: ${userId ? userId : '"Все"'}`;

  const { statusOfLoading: statusOfAlbumLoading } = useAppSelector((store) => store.dataAlbums);
  const { statusOfLoading: statusOfPostsLoading } = useAppSelector((store) => store.dataPosts);
  const { statusOfLoading: statusOfTodosLoading } = useAppSelector((store) => store.dataTodos);

  const performedСonditionOfFetch =
    statusOfAlbumLoading !== pending &&
    statusOfPostsLoading !== pending &&
    statusOfTodosLoading !== pending;

  const classNameOfTitleContainer = cn('title-page', className ? className : '');

  useEffect(() => {
    if (!textRef.current || !performedСonditionOfFetch) return;
    const text = textOfTitle;
    const lengthOfText = text.length - 1;

    const idsOfTimeouts: ReturnType<typeof setTimeout>[] = [];

    const printText = (position: number) => {
      if (!textRef.current) return;
      const nextText = text.substring(0, position);
      textRef.current.textContent = nextText.length !== 0 ? nextText : plug;
    };

    const setTimeoutes = (position: number) => {
      if (lengthOfText === 0 || position > lengthOfText + 1) return;
      const idOfTimeout: ReturnType<typeof setTimeout> = setTimeout(
        () => printText(position),
        (position + 1) * 50
      );
      idsOfTimeouts.push(idOfTimeout);
      setTimeoutes(position + 1);
    };

    textRef.current.innerHTML = plug;
    setTimeoutes(0);
    return () => {
      idsOfTimeouts.reverse().forEach((id) => clearTimeout(id));
    };
  }, [performedСonditionOfFetch, userId]);

  return (
    <div className={classNameOfTitleContainer}>
      <span ref={textRef}></span>
    </div>
  );
};
