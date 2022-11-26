import React, { useRef } from 'react';
import { useFormik, FormikProps } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { HeaderOfPage } from '../../components/HeaderOfPage/HeaderOfPage';
import { CardOfPhoto } from '../../components/CardOfPhoto/CardOfPhoto';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalinfo/uiModalInfoSlice';
import { actionsNotification } from '../../store/slices/uiNotification/uiNotificationSlice';
import { fetchAlbums } from '../../store/slices/dataAlbums/fetchAlbums';

import { LoadingStatuses } from '../../constants/LoadingStatuses';

import { selectPhotosByAlbumId } from '../../store/slices/dataPhotos/customSelectorsOfPhotos';
import { fetchGetImageUrl } from '../../utils/fetchGetImageUrl';
import { validationSchemaAlbumForm } from '../../utils/validationSchema';

import { IClientParams } from '../../store/slices/dataAlbums/fetchAlbums';

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

  const navigateHandler = (path: string) => () => {
    const { title: newTitle } = formik.values;
    const { title } = initialValues;

    if (title !== newTitle) {
      dispatch(
        actionsModalInfo.show({
          message: 'Записанные данные не будут сохранены, вы уверены?',
          pathOfNavigate: albumId ? albumId : '/albums'
        })
      );
      return;
    }
    moveToNewPagePage(path);
  };

  const loadNewPhotoHandler = async () => {
    try {
      dispatch(actionsNotification.show({ message: 'Подождите', type: 'wait' }));
      formik.setSubmitting(true);

      if (!uploadFileBtnRef.current?.files || !uploadFileBtnRef.current) {
        return;
      }

      const file = uploadFileBtnRef.current.files[0];

      const url = await fetchGetImageUrl(file);

      const photoData = {
        title: formik.values.titleOfPhoto,
        url,
        thumbnailUrl: url
      };

      formik.setFieldValue('photos', [...formik.values.photos, photoData], false);
      dispatch(actionsNotification.show({ message: 'Выполнено', type: 'wait' }));
    } catch {
      dispatch(actionsNotification.show({ message: 'Не удалось загрузить', type: 'error' }));
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <div className="contianer-page justify-content-center">
      <HeaderOfPage
        title="Редактирование альбома"
        nameOfPage="updateAlbumPage"
        navigateParams={{ navigateHandler }}
      />

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
            if (formik.values.titleOfPhoto.length === 0) {
              dispatch(
                actionsNotification.show({ message: 'Введите заголовок фото', type: 'error' })
              );
              return;
            }
            if (formik.values.photos.length > 0) {
              dispatch(
                actionsNotification.show({
                  message: 'Интерфейс API только для 1 картинки',
                  type: 'error'
                })
              );
              return;
            }
            uploadFileBtnRef.current.click();
          }}
        >
          Загрузить изображение
        </Button>

        <Button
          variant="light"
          type="submit"
          className="w-100 border rounded"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <span>Подождите</span> : <span>Сохранить</span>}
        </Button>
      </Form>

      <div className="h-100px mt-3 w-100 d-flex flex-wrap justify-content-center gap-2">
        {[...photos, ...formik.values.photos].map((photo, index) => {
          return photo ? <CardOfPhoto key={index} photo={photo} /> : null;
        })}
      </div>

      {statusOfLoading === LoadingStatuses.fulfilled && activeAlbumId && (
        <Navigate to={`/albums/${activeAlbumId}`} replace={true} />
      )}
    </div>
  );
};
