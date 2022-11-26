import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; 

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { actionsUser } from '../../store/slices/dataUser/dataUserSlice'; 


type TNavBtn = {
  [key: string]: string;
  path: string;
  text: string;
};

interface IProps {
  btns: TNavBtn[];
  onClickHandler: (path: string) => () => void;
}

export const NavBtnsOfPage: React.FC<IProps> = ({ btns, onClickHandler }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation()
  const { previouesUserId } = useAppSelector((store) => store.dataUser)

  const navigateHanlder = (path: string) => () => {
    console.log(path)
    if(path.match(/^\/(posts|albums|todos)[/]*$/gi) && !pathname.match(/create|edit/gi)) {
      dispatch(actionsUser.setUserId({id:previouesUserId}))
    }
    onClickHandler(path)();
  }

  return (
    <div className="nav-btns-container">
      {btns.map((btn, index) => (
        <Button key={index} variant="" className="border-bottom" onClick={navigateHanlder(btn.path)}>
          {btn.text}
        </Button>
      ))}
    </div>
  );
};
