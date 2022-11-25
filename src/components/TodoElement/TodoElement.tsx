import React, { useState } from 'react';

import { DeleteElement } from '../DeleteElement/DeleteElement';
import { UpdateTaskElement } from '../UpdateTaskElement/UpdateTaskElement';

import { ITodo } from '../../store/slices/Todos/fetchTodos';

import { sizesOfIcons } from '../../utils/constants';

import EditIcon from '../../assets/svg/edit.svg';
import CloseIcon from '../../assets/svg/close.svg';

interface IProps {
  task: ITodo;
}

export const TodoElement: React.FC<IProps> = ({ task }) => {
  const { width, height } = sizesOfIcons.s;
  const [showStateOfEditForm, setShowStateOfEditForm] = useState<string>('hidden');
  return (
    <div className="p-1 border rounded">
      {showStateOfEditForm === 'hidden' ? (
        <>
          <DeleteElement itemId={task.id} typeOfElement="task" />
          <p>{task.title}</p>

          <img
            className="hover"
            src={EditIcon}
            width={width}
            height={height}
            alt="editIcon"
            onClick={() => setShowStateOfEditForm('visible')}
          />
        </>
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
            <UpdateTaskElement id={task.id} />
          </div>
        </div>
      )}
    </div>
  );
};
