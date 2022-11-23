import { RootState } from "../..";
import { selectorsPosts } from "./dataPostsSlice";

export const selectPostsByTitle = (store: RootState, searchString: string) => {
    const posts = selectorsPosts.selectAll(store);
    if(searchString === '') return posts;
    return posts.filter(post => post.title.includes(searchString));
}