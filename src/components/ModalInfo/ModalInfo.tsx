import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalinfo/uiModalInfoSlice';

export const ModalInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { message, show, pathOfNavigate } = useAppSelector((store) => store.uiModalInfo);

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
        {pathOfNavigate && (
          <Button
            className="border-bottom"
            variant=""
            onClick={() => {
              handleClose();
              navigate(pathOfNavigate);
            }}
          >
            Продолжить
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
