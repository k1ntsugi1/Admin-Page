import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { ThreeDotsSpinner } from '../ThreeDotsSpinner/ThreeDotsSpinner';

import { useAppSelector } from '../../store/hooks';

import { LoadingStatuses } from '../../constants/LoadingStatuses';

interface IProps {
  title: string;
  className?: string;
}

export const TitleOfPage: React.FC<IProps> = ({ title, className }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const blinkingElementRef = useRef<HTMLSpanElement>(null);
  const textOfTitle = `${title} |`;
  const { pending } = LoadingStatuses;

  const { userId } = useAppSelector((store) => store.dataUser);
  const userIdText = `Пользователь: ${userId ? userId : '"Все"'}`;

  const { statusOfLoading: statusOfAlbumLoading } = useAppSelector((store) => store.dataAlbums);
  const { statusOfLoading: statusOfPostsLoading } = useAppSelector((store) => store.dataPosts);
  const { statusOfLoading: statusOfTodosLoading } = useAppSelector((store) => store.dataTodos);

  const performedСonditionOfFetch =
    statusOfAlbumLoading !== pending &&
    statusOfPostsLoading !== pending &&
    statusOfTodosLoading !== pending;

  const classNameOfTitleContainer = cn(
    'title-page',
    'align-items-center',
    className ? className : ''
  );

  const hideBlinkingElement = () => {
    return setTimeout(() => {
      if (!blinkingElementRef.current) return;
      blinkingElementRef.current.style.visibility = 'hidden';
    }, 2000);
  };

  useEffect(() => {
    if (!textRef.current || !blinkingElementRef.current || !performedСonditionOfFetch) return;
    const text = userIdText;
    const lengthOfText = text.length - 1;

    const idsOfTimeouts: ReturnType<typeof setTimeout>[] = [];

    const printText = (position: number) => {
      if (!textRef.current) return;
      const nextText = text.substring(0, position);
      textRef.current.textContent = nextText.length !== 0 ? nextText : '';
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

    textRef.current.textContent = '';

    blinkingElementRef.current.style.visibility = 'visible';
    const idOfTimeoutOfBlinkingElement = hideBlinkingElement();

    idsOfTimeouts.push(idOfTimeoutOfBlinkingElement);

    setTimeoutes(0);
    
    return () => {
      idsOfTimeouts.reverse().forEach((id) => clearTimeout(id));
    };
  }, [performedСonditionOfFetch, userId]);

  return (
    <div className={classNameOfTitleContainer}>
      <p className="m-0 me-1">{textOfTitle}</p>

      {performedСonditionOfFetch && (
        <>
          <p className="m-0 me-1" ref={textRef}></p>
          <span className="blinking" ref={blinkingElementRef}></span>{' '}
        </>
      )}
      {!performedСonditionOfFetch && (
        <div className="w-25">
          <ThreeDotsSpinner />
        </div>
      )}
    </div>
  );
};
