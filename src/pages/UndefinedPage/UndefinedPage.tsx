import React from 'react';
import { Link } from 'react-router-dom';

import { BackgroundGlass } from '../../components/BackgroundGlass/BackgroundGlass';
import { BackgroundCircles } from '../../components/BackgroundCircles/BackgroundCircles';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';

export const UndefinedPage: React.FC = () => {
  return (
    <div className="position-relative contianer-page">
        <TitleOfPage title="Страница не найдена" className='mt-5 h3'/>
      <div className="centered-content-by-position">
        <div className="hover centered-content-by-flex h-60px w-300px border rounded bg-white">
          <Link to="/">Перейти на домашнюю страницу</Link>
        </div>
      </div>
      <BackgroundGlass />
      <BackgroundCircles color='violet'/>
    </div>
  );
};
