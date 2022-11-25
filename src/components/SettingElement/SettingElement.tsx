import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsProgressbar } from '../../store/slices/uiProgressbar/uiProgressbarSlice';
import { actionsUser } from '../../store/slices/dataUser/dataUserSlice';
import { actionsNotification } from '../../store/slices/uiNotification/uiNotificationSlice';

import { sizesOfIcons } from '../../utils/constants';

import SaveIcon from '../../assets/svg/check-all.svg';

import type { FormikProps } from 'formik';

interface IInitialValueOfFormik {
  userId: string;
}

export const SettingElement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width, height } = sizesOfIcons.m;
  const { userId } = useAppSelector((store) => store.dataUser);

  const setTypeOfProgressbarHandler = (newType: string) => () => {
    dispatch(actionsProgressbar.setTypeOfProgressbar({ typeOfProgressBar: newType }));
  };

  const initialValues: IInitialValueOfFormik = {
    userId: userId !== null ? String(userId) : ''
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    onSubmit: ({ userId }) => {
      const id = userId.trim();
      console.log(id, userId);
      if (id.length === 0) {
        dispatch(actionsUser.setUserId({ id: null }));
      } else {
        dispatch(actionsUser.setUserId({ id: Number(id) }));
      }
      dispatch(actionsNotification.show({ message: 'ID cохранен', type: 'success' }));
    }
  });

  return (
    <div className="settingElement-container rounded">
      <div className="p-1">
        <Form noValidate onSubmit={formik.handleSubmit} className="m-0 mb-2 w-100">
          <Form.Label className='fw-bold'>ID пользователя</Form.Label>
          <div className="d-flex flex-row flex-nowrap gap-1">
            <Form.Control
              className="border-0 border-bottom"
              type="text"
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              aria-label="id of user"
              placeholder="Введите id"
            />
            <img
              src={SaveIcon}
              width={width}
              height={height}
              className="hover cursor-pointer"
              onClick={formik.submitForm}
            />
          </div>
        </Form>
        <div className="d-flex flex-column">
          <p className='fw-bold'>Индикатор</p>
          <Button variant="" onClick={setTypeOfProgressbarHandler('circle')}>
            Круглый
          </Button>
          <Button variant="" onClick={setTypeOfProgressbarHandler('straight')}>
            Прямой
          </Button>
        </div>
      </div>
    </div>
  );
};
