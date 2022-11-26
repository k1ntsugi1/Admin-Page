import React, { useState } from 'react';

import { DeleteElement } from '../DeleteElement/DeleteElement';
import { UpdateTaskElement } from '../UpdateTaskElement/UpdateTaskElement';

import { ITodo } from '../../store/slices/dataTodos/fetchTodos';

import { SizesOfIcons } from '../../constants/SizesOfIcons';

import EditIcon from '../../assets/svg/edit.svg';
import CloseIcon from '../../assets/svg/close.svg';

interface IProps {
  task: ITodo;
}

export const TodoElement: React.FC<IProps> = ({ task }) => {
  const { width, height } = SizesOfIcons.xs;
  const [showStateOfEditForm, setShowStateOfEditForm] = useState<string>('hidden');
  return (
    <div className="p-2 border rounded bg-white">
      <div className="d-flex flex-column">
        <div className="p-1 d-flex flex-nowrap justify-content-between gap-2 border-bottom">
          <p className="fw-bold m-0">Задача №{task.id}</p>
          <div className='d-flex flex-nowrap justify-content-between gap-3'>
            <DeleteElement itemId={task.id} typeOfElement="task"/>
            {showStateOfEditForm === 'hidden' ? (
              <img
                className="hover cursor-pointer"
                src={EditIcon}
                width={width}
                height={height}
                alt="editIcon"
                onClick={() => setShowStateOfEditForm('visible')}
              />
            ) : (
              <img
                className="hover cursor-pointer"
                src={CloseIcon}
                width={width}
                height={height}
                alt="closeIcon"
                onClick={() => setShowStateOfEditForm('hidden')}
              />
            )}
          </div>
        </div>
        {showStateOfEditForm === 'hidden' ? (
          <div className='p-1'>{task.title}</div>
        ) : (
          <UpdateTaskElement id={task.id} />
        )}
      </div>
    </div>
  );
};
