import React from 'react';
import cn from 'classnames';

import { Ticker } from '../../components/Ticker/Ticker';
import { BackgroundGlass } from '../../components/BackgroundGlass/BackgroundGlass';
import { BackgroundCircles } from '../../components/BackgroundCircles/BackgroundCircles';

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import GithubIcon from '../../assets/svg/github.svg';
import TelegramIcon from '../../assets/svg/telegram.svg';
import MailIcon from '../../assets/svg/mail.svg';
import ArrowIcon from '../../assets/svg/arrow-up-right-square-fill.svg';

export const HomePage: React.FC = () => {
  const { width, height } = SizesOfIcons.l;

  const classNameOfTicker = cn('border-bottom flex-grow-1 rounded z-index-1000');

  const openLinkHandler = (link: string) => () => {
    window.open(link);
  };

  return (
    <div className="py-3 position-relative w-100 h-100 d-flex flex-wrap justify-content-center align-items-center gap-4 rounded">
      <div className="transcription-card-container h-75 w-25 fs-6 border rounded">
        <div className="h-100 p-4 d-flex flex-column z-index-1000">
          <p>
            Здравствуйте, данный проект выполнен в рамках аттестационного задания.
          </p>
          <p>
           Необходимо было реализовать три сущности(посты, альбомы, todos) и CRUD для них, используя 
            <a className='ms-1' href='https://jsonplaceholder.typicode.com/guide/'>jsonplaceholder API</a>
          </p>
          <p>
           Минимальный стек: webpack, React, typescript, react-router-dom v6, redux/@toolkit, axios и любая
           библитека стилей
          </p>
          <p>
           Получилось <span className="text-decoration-line-through">мудрено</span> неплохо🗿
          </p>
        </div>
        <BackgroundGlass className="rounded" />
      </div>

      <div className="links-contacts-container w-50 h-75 d-flex flex-column border rounded">
        <Ticker
          className={classNameOfTicker}
          onClickHandler={openLinkHandler('https://github.com/k1ntsugi1')}
        >
          <img src={GithubIcon} width={width} height={height} />
          <img src={ArrowIcon} width={width} height={height} />
        </Ticker>

        <Ticker
          className={classNameOfTicker}
          onClickHandler={openLinkHandler('https://t.me/bmasalimov')}
        >
          <img src={TelegramIcon} width={width} height={height} />
          <img src={ArrowIcon} width={width} height={height} />
        </Ticker>

        <Ticker className={classNameOfTicker}>
          <img src={MailIcon} width={width} height={height} />
          <span>bmasalimov5@yandex.ru</span>
        </Ticker>

        <BackgroundGlass className="rounded" />
        <BackgroundCircles color='violet'/>
      </div>
    </div>
  );
};
