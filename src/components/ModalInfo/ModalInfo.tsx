import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalinfo/uiModalInfoSlice';

export const ModalInfo: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const { message, show } = useAppSelector((store) => store.uiModalInfo);

  const handleClose = () => {
    dispatch(actionsModalInfo.close());
  };

  return (
    <Modal show={show} onHide={handleClose} centered aria-labelledby="modal-info">
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button className="border-bottom" variant="" onClick={handleClose}>
          Закрыть
        </Button>
        <Button
          className="border-bottom"
          variant=""
          onClick={() => {
            handleClose();
            if (!pathname.match(/^\/$/gi)) navigate(-1)
          }}
        >
          Продолжить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
