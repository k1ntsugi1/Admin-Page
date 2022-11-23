import React, {useEffect} from 'react';

import { useAppDispatch } from '../store/hooks';
import { fetchTodos } from '../store/slices/Todos/fetchTodos';


export const TodosPage: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodos({method: 'get'}))
    })
    
    return <div>hello</div>
}