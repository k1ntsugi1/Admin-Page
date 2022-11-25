import { RootState } from '../..';
import { selectorsComments } from './dataCommentsSlice';

export const selectCommentsByPostId = (state: RootState, postId: number | string) => {
  const allComments = selectorsComments.selectAll(state);

  const commentsByPostId = allComments.filter(
    (comment) => comment.postId === postId
  );

  return commentsByPostId;
};
