import React, { useState } from 'react';
import { IComment } from '../../store/slices/dataComments/fetchComments';
import { Card } from 'react-bootstrap';

import { DeleteElement } from '../DeleteElement/DeleteElement';
import { UpdateCommentElement } from '../UpdateCommentElement/UpdateCommentElement';
import { BackgroundGlass } from '../BackgroundGlass/BackgroundGlass';

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import EditIcon from '../../assets/svg/edit.svg';
import CloseIcon from '../../assets/svg/close.svg';

interface IProps {
  comment: IComment;
}

export const CardOfComment: React.FC<IProps> = ({ comment }) => {
  const { width, height } = SizesOfIcons.xs;
  const [showStateOfEditForm, setShowStateOfEditForm] = useState<string>('hidden');

  return (
    <div className="mt-2 rounded">
      <Card className="position-relative ms-1 p-2 w-100 border-0 rounded-0 bg-transparent">
        <div className="p-2 d-flex justify-content-end gap-2 border-top border-bottom border-start">
          <DeleteElement itemId={comment.id} typeOfElement="comment" />
          {showStateOfEditForm === 'hidden' ? (
            <img
              className="cursor-pointer hover"
              src={EditIcon}
              width={width}
              height={height}
              alt="editIcon"
              onClick={() => setShowStateOfEditForm('visible')}
            />
          ) : (
            <img
              className="cursor-pointer hover"
              src={CloseIcon}
              width={width}
              height={height}
              alt="closeIcon"
              onClick={() => setShowStateOfEditForm('hidden')}
            />
          )}
        </div>
        {showStateOfEditForm === 'hidden' ? (
          <Card.Body className="border-start border-bottom">
            <Card.Title className="d-flex justify-content-between flex-nowrap">
              <span>{comment?.name}</span>
            </Card.Title>
            <Card.Subtitle className="text-muted">{comment?.email}</Card.Subtitle>
            <Card.Text>{comment?.body}</Card.Text>
          </Card.Body>
        ) : (
          <div>
            <UpdateCommentElement id={comment?.id} />
          </div>
        )}
        <BackgroundGlass />
      </Card>
    </div>
  );
};
