import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { NavBtnsOfPage } from '../../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalInfoSlice';
import { fetchPosts, IClientParams } from '../../store/slices/Posts/fetchPosts';

import { dataOfNavBtns, LoadingStatuses } from '../../utils/constants';
import { validationSchema } from './validationSchema';

import type { FormikProps } from 'formik';

interface IInitialValueOfFormik {
  title: string;
  body: string;
  userId: string | number;
  id?: string | number;
}

export const UpdatePostPage: React.FC = () => {
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

  const moveToNewPagePage = (path: string) => {
    navigate(`${path}/${postId ? postId : ''}`);
  };

  const moveToNewPagePageHandler = (path: string) => () => {
    const { title: newTitle, body: newBody } = formik.values;
    const { title, body } = initialValues;

    if (title !== newTitle || body !== newBody) {
      dispatch(
        actionsModalInfo.show({
          message: 'Записанные данные не будут сохранены, вы уверены?',
          proceedHandler: () => {
            moveToNewPagePage(path);
          }
        })
      );
      return;
    }
    moveToNewPagePage(path);
  };

  return (
    <div className="contianer-page justify-content-center">
      <NavBtnsOfPage
        btns={dataOfNavBtns.updatePostPage}
        onClickHandler={moveToNewPagePageHandler}
      />
      <TitleOfPage title={postId ? 'Редактирование поста' : 'Создание поста'} />

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
          disabled={statusOfLoading === LoadingStatuses.pending}
        >
          {statusOfLoading === LoadingStatuses.pending ? (
            <span>Подождите</span>
          ) : (
            <span>Сохранить</span>
          )}
        </Button>
      </Form>
    </div>
  );
};
