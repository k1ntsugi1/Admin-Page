import React from 'react';

import { ITodo } from '../../store/slices/Todos/fetchTodos';

interface IProps {
    task: ITodo
}

export const TodoElement: React.FC<IProps> = ({task}) => {
    return (
        <div className="p-1 border rounded">{task.title}</div>
    )
}