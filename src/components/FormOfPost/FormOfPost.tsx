import React from 'react';
import { useFormik } from 'formik';
import type { FormikProps } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectorsPosts, actionsPosts } from '../../store/slices/Posts/dataPostsSlice';
import { validationSchema } from './validationSchema';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../../store/slices/Posts/fetchPosts';
import { fetchPosts, IClientParams } from '../../store/slices/Posts/fetchPosts';

interface IInitialValueOfFormik {
  title: string;
  body: string;
  userId: string | number,
  id?:  string | number,
}

export const FormOfPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const { entities } = useAppSelector((store) => store.dataPosts);
  const editingPost = postId ? entities[postId] : {};

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues: {
    title: '',
    body: '',
    userId: 0,
    ...editingPost
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const clientParams: IClientParams = {
        method: postId ? 'put' : 'post',
        postId: postId ?? null,
        values
      };
      dispatch(fetchPosts(clientParams));
    }
  });

  return (
    <>
      <div className="mt-5  w-100">
        <Button
          variant=""
          className="mx-auto"
          onClick={() => {
            navigate(`/posts/${postId}`);
          }}
        >
          Вернуться
        </Button>
      </div>
      <Form noValidate onSubmit={formik.handleSubmit} className="w-100 h-100">
        <Form.Group>
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            aria-label="title of post"
            placeholder="Введите заголовок"
            isInvalid={!!formik.errors.title}
          />
        </Form.Group>
        <Form.Group className="h-75">
          <Form.Label>Текст поста</Form.Label>
          <Form.Control
            className="h-75"
            as="textarea"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            aria-label="body of post"
            placeholder="Введите текст поста"
            isInvalid={!!formik.errors.body}
          />
        </Form.Group>
        <Button variant="" type="submit" className="w-100 border rounded">
          Сохранить
        </Button>
      </Form>
    </>
  );
};
