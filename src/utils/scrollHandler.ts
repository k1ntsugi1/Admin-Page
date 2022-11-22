import { AppDispatch } from '../store';
import { actionsProgressbar } from '../store/slices/uiProgressbarSlice';

interface IScrollHandler {
  (element: HTMLElement, appDispatch: AppDispatch): void;
}

export const scrollHandler: IScrollHandler = (element, appDispatch) => {
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = element.scrollHeight;
  const scrollTop = element.scrollTop + element.clientHeight;
  const percentOfFilling =
    scrollHeight - clientHeight > 0
      ? ((scrollTop - clientHeight) / (scrollHeight - clientHeight)) * 100
      : 0;
  appDispatch(actionsProgressbar.updatepPercentOfFilling({ percentOfFilling }));
};
