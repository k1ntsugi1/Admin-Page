import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { actionsProgressbar } from '../../store/slices/uiProgressbarSlice';
import { Button } from 'react-bootstrap';
export const SettingElement: React.FC = () => {
  const dispatch = useAppDispatch();
  const setTypeOfProgressbarHandler = (newType: string) => () => {
    dispatch(actionsProgressbar.setTypeOfProgressbar({ typeOfProgressBar: newType }));
  };
  return (
    <div className="settingElement-container rounded">
      <div>
        <h6>Индикатор</h6>
        <div className="d-flex flex-column">
            <Button variant='' onClick={setTypeOfProgressbarHandler('circle')}>Круглый</Button>
            <Button variant='' onClick={setTypeOfProgressbarHandler('straight')}>Прямой</Button>
        </div>
      </div>
    </div>
  );
};
