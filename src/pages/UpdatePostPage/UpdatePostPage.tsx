import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { NavBtnsOfPage } from '../../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalInfoSlice';
import { fetchPosts, IClientParams } from '../../store/slices/Posts/fetchPosts';

import { dataOfNavBtns, LoadingStatuses } from '../../utils/constants';
import { validationSchemaPostForm } from '../../utils/validationSchema';

import type { FormikProps } from 'formik';

interface IInitialValueOfFormik {
  title: string;
  body: string;
  userId: number;
  id?: number;
}

export const UpdatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  const { userId } = useAppSelector((store) => store.dataUser);
  const { entities, statusOfLoading, activePostId } = useAppSelector((store) => store.dataPosts);
  const editingPost = postId ? entities[postId] : {};

  const initialValues: IInitialValueOfFormik = {
    title: '',
    body: '',
    userId: userId ? userId : 0,
    ...editingPost
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    validationSchema: validationSchemaPostForm,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const clientParams: IClientParams = {
        method: postId ? 'patch' : 'post',
        postId: Number(postId) ?? null,
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
          // proceedHandler: () => {
          //   moveToNewPagePage(path);
          // }
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
        <Form.Control
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          aria-label="title of post"
          placeholder="Введите заголовок"
          isInvalid={!!formik.errors.title}
        />

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
      {statusOfLoading === LoadingStatuses.fulfilled && activePostId && (
        <Navigate to={`/posts/${activePostId}`} replace={true} />
      )}
    </div>
  );
};
