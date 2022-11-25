import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult as IDropResult
} from 'react-beautiful-dnd';

import { HeaderOfPage } from '../../components/HeaderOfPage/HeaderOfPage';
import { TitleOfPage } from '../../components/TitleOfPage/TitleOfPage';
import { MagnifyingGlassSpinner } from '../../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { TodoListDroppable } from '../../components/TodoListDroppable/TodoListDroppable';
import { TodoElement } from '../../components/TodoElement/TodoElement';
import { UpdateTaskElement } from '../../components/UpdateTaskElement/UpdateTaskElement';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodos, ITodo } from '../../store/slices/dataTodos/fetchTodos';
import { selectTodosByTitle } from '../../store/slices/dataTodos/customSelectorOfTodos';
import { actionsNotification } from '../../store/slices/uiNotification/uiNotificationSlice';
import { LoadingStatuses } from '../../utils/constants';

interface IAccOfReduceTodos {
  [index: string]: ITodo[];
  completed: ITodo[];
  uncompleted: ITodo[];
}

export const TodosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>('');

  const { userId } = useAppSelector((store) => store.dataUser);
  const { statusOfLoading, userIdsWithLoadedTodos, allTodosAreLoaded } = useAppSelector(
    (store) => store.dataTodos
  );
  const todos = useAppSelector((store) => selectTodosByTitle(store, searchString));

  const todosByStatusOfCompleted = todos.reduce(
    (acc: IAccOfReduceTodos, todo: ITodo) => {
      if (todo.completed) acc.completed.push(todo);
      if (!todo.completed) acc.uncompleted.push(todo);
      return acc;
    },
    { completed: [], uncompleted: [] }
  );

  const performedСonditionOfFetchTodos =
    (userId && !userIdsWithLoadedTodos.includes(userId)) || (!userId && !allTodosAreLoaded);

  const onDragEndHandler = async (result: IDropResult) => {
    if (!result) return;
    const { destination, source, draggableId } = result;
    if (destination && destination.droppableId !== source.droppableId) {
      const value = todos.find((task) => task.id === Number(draggableId));
      if (value) {
        const nextValues = { ...value };
        nextValues.completed = !value.completed;

        dispatch(actionsNotification.show({ message: 'Подождите', type: 'success' }));
        await dispatch(fetchTodos({ method: 'patch', values: nextValues }));
      }
    }
  };

  useEffect(() => {
    if (performedСonditionOfFetchTodos) dispatch(fetchTodos({ method: 'get' }));
  }, [userId]);

  return (
    <div className="contianer-page">
      <HeaderOfPage
        title="Задачи"
        nameOfPage="todosPage"
        searchParams={{ searchString, setSearchString }}
      />

      <div className="container-fluid">
        {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}

        {statusOfLoading === LoadingStatuses.fulfilled && (
          <div className="pb-3 row">
            <DragDropContext onDragEnd={onDragEndHandler}>
              <TodoListDroppable
                droppableId="completed"
                title="Завершенные:"
                todos={todosByStatusOfCompleted.completed}
              />
              <TodoListDroppable
                droppableId="uncompleted"
                title="В процессе:"
                todos={todosByStatusOfCompleted.uncompleted}
              />
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};
