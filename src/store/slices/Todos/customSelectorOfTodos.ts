import { RootState } from "../..";
import { selectorsTodos } from "./dataTodosSLice";

export const selectPostsByTitle = (store: RootState, searchString: string) => {
    const { userId } = store.dataUser
    const todos = selectorsTodos.selectAll(store);
    const todosOfUser = userId === null ? todos : todos.filter(todo => todo.userId === userId);
    if(searchString === '') return todosOfUser;
    return todosOfUser.filter(todo => todo.title.includes(searchString));
}