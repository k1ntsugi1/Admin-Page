import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionsModalInfo } from '../../store/slices/uiModalInfoSlice';

export const ModalInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, show, proceedHandler } = useAppSelector((store) => store.uiModalInfo);
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
            proceedHandler();
          }}
        >
          Продолжить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
