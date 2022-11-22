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
import { actionsModalInfo } from '../../store/slices/uiModalInfoSlice';

interface IInitialValueOfFormik {
  title: string;
  body: string;
  userId: string | number;
  id?: string | number;
}

export const FormOfPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const { entities, statusOfLoading } = useAppSelector((store) => store.dataPosts);
  const editingPost = postId ? entities[postId] : {};

  const initialValues: IInitialValueOfFormik = {
    title: '',
    body: '',
    userId: 0,
    ...editingPost
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
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

  const goToPosts = () => {
    navigate(`/posts/${postId ? postId : ''}`)
  }

  const goBackHandler = () => {
    const { title: newTitle, body: newBody } = formik.values;
    const { title, body } = initialValues;
    if (title !== newTitle || body !== newBody) {
      dispatch(
        actionsModalInfo.show({
          message: 'Записанные данные не будут сохранены, вы уверены?',
          proceedHandler: () => {
            goToPosts();
          }
        })
      );
      return;
    }
    goToPosts();
  };

  return (
    <div className="p-5 h-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-nowrap gap-3 justify-content-center">
        <Button variant="" className="border-bottom" onClick={goBackHandler}>
          Вернуться
        </Button>
      </div>
      <p className="my-3 pt-3 pb-4 h3 border-bottom d-flex justify-content-center">
        {postId ? <span>Редактирование поста</span> : <span>Создание поста</span>}
      </p>
      <Form noValidate onSubmit={formik.handleSubmit} className="h-75 d-flex flex-column gap-3">
        <Form.Group>
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
          <Form.Control
            className="h-100"
            as="textarea"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            aria-label="body of post"
            placeholder="Введите текст поста"
            isInvalid={!!formik.errors.body}
          />
        </Form.Group>
        <Button
          variant="light"
          type="submit"
          className="w-100 border rounded"
          disabled={statusOfLoading === 'pending'}
        >
          {statusOfLoading === 'pending' ? <span>Подождите</span> : <span>Сохранить</span>}
        </Button>
      </Form>
    </div>
  );
};
