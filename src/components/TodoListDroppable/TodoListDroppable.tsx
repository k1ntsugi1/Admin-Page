import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TitleOfPage } from '../TitleOfPage/TitleOfPage';
import { TodoElement } from '../TodoElement/TodoElement';
import { ITodo } from '../../store/slices/Todos/fetchTodos'

interface IProps {
    droppableId: string,
    title: string,
    todos: ITodo[],
}

export const TodoListDroppable: React.FC<IProps> = (props) => {
    const { droppableId, title, todos } = props;
    return (
        <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="col min-width-200px">
                    <TitleOfPage title={title} className='h4'/>
                    <div className="d-flex flex-column gap-2">
                      {todos.map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TodoElement task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
    )
}