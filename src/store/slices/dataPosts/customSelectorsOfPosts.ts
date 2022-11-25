import { RootState } from "../..";
import { selectorsPosts } from "./dataPostsSlice";

export const selectPostsByTitle = (store: RootState, searchString: string) => {
    const { userId } = store.dataUser
    const posts = selectorsPosts.selectAll(store);
    const postsOfUser = userId === null ? posts : posts.filter(post => post.userId === userId);
    if(searchString === '') return postsOfUser;
    return postsOfUser.filter(post => post.title.includes(searchString));
}