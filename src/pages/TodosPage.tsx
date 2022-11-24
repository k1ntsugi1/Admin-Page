import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodos, ITodo } from '../store/slices/Todos/fetchTodos';
import { selectTodosByTitle } from '../store/slices/Todos/customSelectorOfTodos';

interface IAccOfReduceTodos {
  completed: ITodo[];
  uncompleted: ITodo[];
}

export const TodosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const { userId } = useAppSelector((store) => store.dataUser);

  const todos = useAppSelector((store) => selectTodosByTitle(store, searchString));
  const { completed, uncompleted } = todos.reduce(
    (acc: IAccOfReduceTodos, todo: ITodo) => {
      if (todo.completed) acc.completed.push(todo);
      if (!todo.completed) acc.uncompleted.push(todo);
      return acc;
    },
    { completed: [], uncompleted: [] }
  );

  const setSearchStringHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  };

  useEffect(() => {
    dispatch(fetchTodos({ method: 'get' }));
  });

  return (
    <div className="contianer-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <TitleOfPage title="Завершенные:" />
            {completed.map(task => <div key={task.id}>{task.title}</div>)}
          </div>
          <div className="col">
            <TitleOfPage title="В процессе:" />
            {uncompleted.map(task => <div key={task.id}>{task.title}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
