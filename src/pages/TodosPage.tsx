import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult as IDropResult
} from 'react-beautiful-dnd';
import { Form } from 'react-bootstrap';

import { TitleOfPage } from '../components/TitleOfPage/TitleOfPage';
import { MagnifyingGlassSpinner } from '../components/MagnifyingGlassSpinner/MagnifyingGlassSpinner';
import { TodoElement } from '../components/TodoElement/TodoElement';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodos, ITodo } from '../store/slices/Todos/fetchTodos';
import { selectTodosByTitle } from '../store/slices/Todos/customSelectorOfTodos';

import { LoadingStatuses } from '../utils/constants';

interface IAccOfReduceTodos {
  [index: string]: ITodo[];
  completed: ITodo[];
  uncompleted: ITodo[];
}

export const TodosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>('');

  const { userId } = useAppSelector((store) => store.dataUser);
  const { statusOfLoading, userIdsWithLoadedTodos, allTodosAreLoaded } = useAppSelector((store) => store.dataTodos);
  const todos = useAppSelector((store) => selectTodosByTitle(store, searchString));

  const todosByStatusOfCompleted = todos.reduce(
    (acc: IAccOfReduceTodos, todo: ITodo) => {
      if (todo.completed) acc.completed.push(todo);
      if (!todo.completed) acc.uncompleted.push(todo);
      return acc;
    },
    { completed: [], uncompleted: [] }
  );

  const performedСonditionOfFetchAlbums =
  (userId && !userIdsWithLoadedTodos.includes(userId)) || (!userId && !allTodosAreLoaded);

  const setSearchStringHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  };

  const onDragEndHandler = (result: IDropResult) => {
    if (!result) return;
    console.log(result);
    const { destination, source, draggableId } = result;
    if (destination && destination.droppableId !== source.droppableId) {
      const values = todosByStatusOfCompleted[source.droppableId].find((task) => task.id === Number(draggableId));
      if (values) dispatch(fetchTodos({ method: 'patch', values }))
    }
  };

  useEffect(() => {
    if (performedСonditionOfFetchAlbums) dispatch(fetchTodos({ method: 'get' }));
  }, [userId]);

  return (
    <div className="contianer-page">
      <div className="container-fluid">
        <TitleOfPage title={`Задачи | Пользователь ${userId === null ? 'Все' : userId}`} />
        {statusOfLoading === LoadingStatuses.pending && <MagnifyingGlassSpinner />}
        {statusOfLoading === LoadingStatuses.fulfilled && (
          <div className="row">
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="col">
                    <TitleOfPage title="Завершенные:" />
                    {todosByStatusOfCompleted.completed.map((task, index) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoElement task={task}/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="uncompleted">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="col">
                    <TitleOfPage title="В процессе:" />
                    {todosByStatusOfCompleted.uncompleted.map((task, index) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoElement task={task}/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};
