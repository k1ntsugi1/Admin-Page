import React from 'react';
import { Button } from 'react-bootstrap';

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
  return (
    <div className="nav-btns-container">
      {btns.map((btn, index) => (
        <Button key={index} variant="" className="border-bottom" onClick={onClickHandler(btn.path)}>
          {btn.text}
        </Button>
      ))}
    </div>
  );
};
