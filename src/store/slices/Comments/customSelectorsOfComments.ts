import { RootState } from '../..';
import { selectorsComments } from './dataCommentsSlice';

export const selectCommentsByPostId = (state: RootState, postId: number | string) => {
  const allComments = selectorsComments.selectEntities(state) ?? {};

  const commentsByPostId = Object.values(allComments).filter(
    (comment) => Number(comment?.postId) === postId
  );

  return commentsByPostId;
};
