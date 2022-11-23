import React from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments, IClientParams } from '../../store/slices/Comments/fetchComments';

import { LoadingStatuses } from '../../utils/constants';
import { validationSchemaCommentForm } from '../../utils/validationSchema';

import type { FormikProps } from 'formik';

interface IInitialValueOfFormik {
  postId: number;
  name: string;
  email: string;
  body: string;
  id?: number;
}

interface IProps {
  id?: string | number;
}

export const UpdateCommentElement: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  const { entities, statusOfLoading, methodOfFetch } = useAppSelector((store) => store.dataComments);
  const editingComment = id ? entities[id] : {};

  const classNamesOfFormItems = cn('border-0 rounded-0 border-bottom');

  const initialValues: IInitialValueOfFormik = {
    postId: Number(postId!),
    name: '',
    email: '',
    body: '',
    ...editingComment
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    validationSchema: validationSchemaCommentForm,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const clientParams: IClientParams = {
        method: values.id ? 'patch' : 'post',
        postId: Number(postId!),
        values
      };
      dispatch(fetchComments(clientParams));
    }
  });

  return (
    <div className="m-0 ms-1 p-2 h-25">
      <Form noValidate onSubmit={formik.handleSubmit} className="m-0 p-1 border h-75">
        <Form.Control
          className={classNamesOfFormItems}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          aria-label="name of user"
          placeholder="Введите имя"
          isInvalid={!!formik.errors.name}
        />
        <Form.Control
          className={classNamesOfFormItems}
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          aria-label="name of user"
          placeholder="Введите email"
          isInvalid={!!formik.errors.email}
        />

        <Form.Control
          className="border-0 rounded-0 border-bottom h-75"
          as="textarea"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          aria-label="body of post"
          placeholder="Введите текст комментария"
          isInvalid={!!formik.errors.body}
        />
        <Button
          variant="light"
          type="submit"
          className="w-100 border rounded"
          disabled={statusOfLoading === LoadingStatuses.pending && (methodOfFetch !== 'get')}
        >
          {statusOfLoading === LoadingStatuses.pending && (methodOfFetch !== 'get') ? (
            <span>Подождите</span>
          ) : (
            <span>Сохранить</span>
          )}
        </Button>
      </Form>
    </div>
  );
};
