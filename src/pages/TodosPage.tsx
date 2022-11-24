import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

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

  const setSearchStringHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  }

  useEffect(() => {
    dispatch(fetchTodos({ method: 'get' }));
  });

  return (
    <div className="contianer-page">
      <Form.Control
        className="mt-4"
        type="text"
        name="todos by title"
        value={searchString}
        onChange={setSearchStringHandler}
        aria-label="search by post title"
        placeholder="Поиск поста"
      />
    </div>
  );
};
