import React from 'react';
import Ticker from '../components/Ticker/Ticker';
import GithubIcon from '../assets/svg/github.svg';
import TelegramIcon from '../assets/svg/telegram.svg';
import MailIcon from '../assets/svg/mail.svg';
import ArrowIcon from '../assets/svg/arrow-up-right-square-fill.svg';
import { sizesOfIcons } from '../utils/constants';
import cn from 'classnames';
import { BackgroundGlass } from '../components/BackgroundGlass/BackgroundGlass';
export const HomePage: React.FC = () => {
  const { width, height } = sizesOfIcons.l;
  const openLinkHandler = (link: string) => {
    window.open(link);
  };
  const classNameOfTicker = cn('border-bottom flex-grow-1 rounded z-index-1000');
  return (
    <div className="w-100 h-100 d-flex flex-wrap justify-content-center align-items-center gap-4 rounded">
      <div className="transcription-card-container h-75 w-25 fs-6 rounded">
        <div className="h-100 p-4 d-flex flex-column z-index-1000">
          <p className="z-index-1000">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </p>
        </div>
        <BackgroundGlass className="rounded" />
      </div>
      <div className="links-contacts-container w-50 h-75 d-flex flex-column rounded">
        <Ticker
          className={classNameOfTicker}
          onClickHandler={() => openLinkHandler('https://github.com/k1ntsugi1')}
        >
          <img src={GithubIcon} width={width} height={height} />
          <img src={ArrowIcon} width={width} height={height} />
        </Ticker>

        <Ticker
          className={classNameOfTicker}
          onClickHandler={() => openLinkHandler('https://t.me/bmasalimov')}
        >
          <img src={TelegramIcon} width={width} height={height} />
          <img src={ArrowIcon} width={width} height={height} />
        </Ticker>
        <Ticker
          className={classNameOfTicker}
          onClickHandler={() => openLinkHandler('https://github.com/k1ntsugi1')}
        >
          <img src={MailIcon} width={width} height={height} />
          <span>bmasalimov5@yandex.ru</span>
        </Ticker>
        <BackgroundGlass className="rounded" />
      </div>
    </div>
  );
};
