import React from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodos } from '../../store/slices/dataTodos/fetchTodos'; 
import { actionsNotification } from '../../store/slices/uiNotification/uiNotificationSlice';

import { LoadingStatuses } from '../../utils/constants';
import { validationSchemaTaskForm } from '../../utils/validationSchema';

import type { FormikProps } from 'formik';

interface IInitialValueOfFormik {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

interface IProps {
  id?: number;
}

export const UpdateTaskElement: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { userId } = useAppSelector((store) => store.dataUser);
  const { entities } = useAppSelector((store) => store.dataTodos);
  const editingTask = id ? entities[id] : {};

  const classNamesOfFormItems = cn('');

  const initialValues: IInitialValueOfFormik = {
    userId: userId ? userId : 0,
    title: '',
    completed: false,
    ...editingTask
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    validationSchema: validationSchemaTaskForm,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
        const nextValue = {...values, userId: Number(values.userId)}
        const method = values.id ? 'patch' : 'post';
        dispatch(actionsNotification.show({ message: 'Подождите', type: 'success' }));
        dispatch(fetchTodos({method, values: nextValue}))
    }
  });

  return (
    <div className="m-0 ms-1 p-2 h-60px w-100">
      <Form noValidate onSubmit={formik.handleSubmit} className="h-100 w-100 d-flex flex-row flex-nowrap">
        <Form.Control
          className={classNamesOfFormItems}
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          aria-label="title of task"
          placeholder="Введите задачу"
          isInvalid={!!formik.errors.title}
        />
        
        <Button
          variant="light"
          type="submit"
          className="border rounded"
          //disabled={statusOfLoading === LoadingStatuses.pending && (methodOfFetch !== 'get')}
        >
          {/* {statusOfLoading === LoadingStatuses.pending && (methodOfFetch !== 'get') ? (
            <span>Подождите</span>
          ) : ( */}
            <span>Сохранить</span>
          {/* )} */}
        </Button>
      </Form>
    </div>
  );
};