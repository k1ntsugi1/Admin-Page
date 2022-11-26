import React  from 'react';
import type { FormikProps } from 'formik';

import cn from 'classnames';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments, IClientParams } from '../../store/slices/dataComments/fetchComments';

import { validationSchemaCommentForm } from '../../utils/validationSchema';

interface IInitialValueOfFormik {
  postId: number;
  name: string;
  email: string;
  body: string;
  id?: number;
}

interface IProps {
  id?:  number;
}

export const UpdateCommentElement: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  const { userId } = useAppSelector((store) => store.dataUser);
  const { entities: entitiesOfUser } = useAppSelector((store) => store.dataUser)
  const { entities } = useAppSelector(
    (store) => store.dataComments
  );
  const editingComment = id ? entities[id] : {};

  const classNamesOfFormItems = cn('border-0 rounded-0 border-bottom');

  const initialValues: IInitialValueOfFormik = {
    postId: Number(postId!),
    name: userId ? entitiesOfUser[userId]?.name ?? '' : '',
    email: userId ? entitiesOfUser[userId]?.email ?? '' : '',
    body: '',
    ...editingComment
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    validationSchema: validationSchemaCommentForm,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, actions) => {
      try {
        const clientParams: IClientParams = {
          method: values.id ? 'patch' : 'post',
          postId: Number(postId!),
          values
        };
        await dispatch(fetchComments(clientParams));
      } finally {
        actions.setSubmitting(false);
      }
    }
  });

  return (
    <div className="m-0">
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="m-0 p-1 h-100 d-flex flex-column gap-2 border"
      >
        <Form.Control
          className={classNamesOfFormItems}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          aria-label="name of user"
          placeholder="Введите имя"
          isInvalid={!!formik.errors.name}
          disabled={initialValues.name.length > 0}
        />
        <Form.Control
          className={classNamesOfFormItems}
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          aria-label="email"
          placeholder="Введите email"
          isInvalid={!!formik.errors.email}
          disabled={initialValues.email.length > 0}
        />

        <Form.Control
          className="height-150px border-0 rounded-0 border-bottom"
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
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <span>Подождите</span> : <span>Сохранить</span>}
        </Button>
      </Form>
    </div>
  );
};
