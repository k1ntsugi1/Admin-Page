import React from 'react';

import { SearchByTitleElement } from '../SearchByTitleElement/SearchByTitleElement';
import { NavBtnsOfPage } from '../NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../TitleOfPage/TitleOfPage';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';
import { BackgroundCircles } from '../BackgroundCircles/BackgroundCircles';

import { DataOfNavigationBtns } from '../../constants/DataOfNavigationBtns';

interface IProps {
  searchParams?: {
    searchString: string;
    setSearchString: (string: string) => void;
  };
  navigateParams?: {
    navigateHandler: (path: string) => () => void;
  };
  nameOfPage: string;
  title: string;
}

export const HeaderOfPage: React.FC<IProps> = (props) => {
  const { searchParams, navigateParams, nameOfPage, title } = props;

  const colorOfBackgroundCircles = nameOfPage.match(/album/gi)
    ? 'green'
    : nameOfPage.match(/post/gi)
    ? 'blue'
    : 'orange';

  return (
    <div className="mb-3 p-3 position-relative border rounded">
      {navigateParams && DataOfNavigationBtns[nameOfPage] && (
        <NavBtnsOfPage
          btns={DataOfNavigationBtns[nameOfPage]}
          onClickHandler={navigateParams.navigateHandler}
        />
      )}

      <TitleOfPage
        title={title}
        className="h3"
      />

      {searchParams && <SearchByTitleElement searchParams={searchParams} />}
      <BackgroundGlass />
      <BackgroundCircles color={colorOfBackgroundCircles} />
    </div>
  );
};
