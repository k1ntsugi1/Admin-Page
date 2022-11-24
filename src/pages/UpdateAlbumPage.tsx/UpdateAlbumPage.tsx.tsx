import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { NavBtnsOfPage } from '../../components/NavBtnsOfPage/NavBtnsOfPage';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalInfoSlice';
import { actionsNotification } from '../../store/slices/uiNotificationSlice';
import { fetchAlbums } from '../../store/slices/Albums/fetchAlbums';

import { dataOfNavBtns, LoadingStatuses } from '../../utils/constants';
import { selectPhotosByAlbumId } from '../../store/slices/Photos/customSelectorsOfPhotos';
import { fetchGetImageUrl } from '../../utils/fetchGetImageUrl';
import { validationSchemaAlbumForm } from '../../utils/validationSchema';

import type { FormikProps } from 'formik';
import { IClientParams } from '../../store/slices/Albums/fetchAlbums';

type TNewPhoto = {
  title: string;
  url: string;
  thumbnailUrl: string;
  id?: number;
};

interface IInitialValueOfFormik {
  title: string;
  userId: number;
  id?: number;
  titleOfPhoto: string;
  photos: TNewPhoto[];
}

export const UpdateAlbumPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { albumId } = useParams();
  const uploadFileBtnRef = useRef<HTMLInputElement>(null);

  const { userId } = useAppSelector((store) => store.dataUser);
  const { entities, statusOfLoading, activeAlbumId } = useAppSelector((store) => store.dataAlbums);
  const photos = useAppSelector((store) =>
    selectPhotosByAlbumId(store, albumId ? Number(albumId) : null)
  );

  const editingAlbum = albumId ? entities[albumId] : {};

  const initialValues: IInitialValueOfFormik = {
    title: '',
    titleOfPhoto: '',
    userId: userId ? userId : 0,
    photos: [],
    ...editingAlbum
  };

  const formik: FormikProps<IInitialValueOfFormik> = useFormik<IInitialValueOfFormik>({
    initialValues,
    validationSchema: validationSchemaAlbumForm,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const { title, userId } = values;
      const clientParams: IClientParams = {
        method: albumId ? 'patch' : 'post',
        valuesOfAlbum: {
          title,
          userId
        }
      };
      if (values.id) {
        clientParams.albumId = values.id;
      }
      if (values.photos.length > 0) {
        clientParams.valuesOfPhotos = values.photos;
      }
      await dispatch(fetchAlbums(clientParams));
    }
  });

  const moveToNewPagePage = (path: string) => {
    navigate(`${path}/${albumId ? albumId : ''}`);
  };

  const moveToNewPagePageHandler = (path: string) => () => {
    const { title: newTitle } = formik.values;
    const { title} = initialValues;

    if (title !== newTitle) {
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

  const loadNewPhotoHandler = async () => {
    if (formik.values.titleOfPhoto.length === 0) {
      dispatch(actionsNotification.show({ message: 'Введите заголовок фото', type: 'error' }));
      return;
    }
    if (formik.values.photos.length > 0) {
      dispatch(
        actionsNotification.show({ message: 'интерфейс API только для 1 картинки', type: 'error' })
      );
      return;
    }

    if (!uploadFileBtnRef.current?.files || !uploadFileBtnRef.current) {
      return;
    }

    dispatch(actionsNotification.show({ message: 'Подождите', type: 'success' }));

    const file = uploadFileBtnRef.current.files[0];

    const url = await fetchGetImageUrl(file);

    const photoData = {
      title: formik.values.titleOfPhoto,
      url,
      thumbnailUrl: url
    };

    formik.setFieldValue('photos', [...formik.values.photos, photoData], false);
    dispatch(actionsNotification.show({ message: 'Добавлено', type: 'success' }));
  };

  return (
    <div className="contianer-page justify-content-center">
      <NavBtnsOfPage
        btns={dataOfNavBtns.updateAlbumPage}
        onClickHandler={moveToNewPagePageHandler}
      />
      <TitleOfPage title={albumId ? 'Редактирование альбома' : 'Создание альбома'} />

      <Form noValidate onSubmit={formik.handleSubmit} className="h-75 d-flex flex-column gap-3">
        <Form.Control
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          aria-label="title of album"
          placeholder="Введите заголовок альбома"
          isInvalid={!!formik.errors.title}
        />

        <Form.Control
          type="text"
          name="titleOfPhoto"
          value={formik.values.titleOfPhoto}
          onChange={formik.handleChange}
          aria-label="title of album"
          placeholder="Введите заголовок фото"
          isInvalid={!!formik.errors.title}
        />

        <Form.Control
          hidden
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          ref={uploadFileBtnRef}
          onChange={loadNewPhotoHandler}
        />

        <Button
          variant="light"
          className="w-100"
          onClick={() => {
            if (!uploadFileBtnRef.current) return;
            uploadFileBtnRef.current.click();
          }}
        >
          Загрузить изображение
        </Button>

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

      <div className="h-50 w-100 d-flex flex-wrap gap-1 overflow-auto">
        {[...photos, ...formik.values.photos].map((photo, index) => {
          return photo ? <img key={index} src={photo.url} width={150} height={150} /> : null;
        })}
      </div>

      {statusOfLoading === LoadingStatuses.fulfilled && activeAlbumId && (
        <Navigate to={`/albums/${activeAlbumId}`} replace={true} />
      )}
    </div>
  );
};
