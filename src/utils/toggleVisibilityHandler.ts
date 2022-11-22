import { RefObject } from 'react';

interface IProps {
  (ref: RefObject<HTMLElement>, state: string): void;
}

export const toggleVisibilityhandler: IProps = (ref, state) => {
  if (!ref.current) return;

  setTimeout(() => {
    if (state === 'hidden') ref.current!.style.visibility = 'hidden';
  }, 400);

  if (state === 'visible') ref.current.style.visibility = '';
};
