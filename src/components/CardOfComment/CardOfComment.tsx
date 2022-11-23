import React, { useState } from 'react';
import { IComment } from '../../store/slices/Comments/fetchComments';
import { Card } from 'react-bootstrap';

import { UpdateCommentElement } from '../UpdateCommentElement/UpdateCommentElement';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';

import { sizesOfIcons } from '../../utils/constants';

import EditIcon from '../../assets/svg/edit.svg';
import CloseIcon from '../../assets/svg/close.svg';

interface IProps {
  comment: IComment;
}

export const CardOfComment: React.FC<IProps> = ({ comment }) => {
  const { width, height } = sizesOfIcons.s;
  const [showStateOfEditForm, setShowStateOfEditForm] = useState<string>('hidden');

  return (
    <div>
      {showStateOfEditForm === 'hidden' ? (
        <Card className="position-relative ms-1 p-2 w-100 border-0 rounded-0 bg-transparent">
          <Card.Body className="border-start border-bottom">
            <Card.Title className="d-flex justify-content-between flex-nowrap">
              <span>{comment?.name}</span>
              <img
                className="hover"
                src={EditIcon}
                width={width}
                height={height}
                alt="editIcon"
                onClick={() => setShowStateOfEditForm('visible')}
              />
            </Card.Title>
            <Card.Subtitle className="text-muted">{comment?.email}</Card.Subtitle>
            <Card.Text>{comment?.body}</Card.Text>
          </Card.Body>
          <BackgroundGlass />
        </Card>
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            <img
              className="hover"
              src={CloseIcon}
              width={width}
              height={height}
              alt="closeIcon"
              onClick={() => setShowStateOfEditForm('hidden')}
            />
          </div>
          <div>
            <UpdateCommentElement id={comment?.id} />
          </div>
        </div>
      )}
    </div>
  );
};
