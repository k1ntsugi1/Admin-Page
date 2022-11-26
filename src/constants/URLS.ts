interface IURLS {
  POSTS: {
    ALL: () => string;
    BY_POST_ID: (postId: number) => string;
    BY_USER_ID: (userId: number) => string;
  };
  COMMENTS: {
    ALL: () => string;
    BY_POST_ID: (postId: number) => string;
    BY_COMMENT_ID: (commentId: number) => string;
  };
  ALBUMS: {
    ALL: () => string;
    BY_ALBUM_ID: (albumId: number) => string;
    BY_USER_ID: (userId: number) => string;
  };
  PHOTOS: {
    ALL: () => string;
    BY_PHOTO_ID: (photoId: number) => string;
    BY_ALBUM_ID: (albumId: number) => string;
  };
  TODOS: {
    ALL: () => string;
    BY_TODO_ID: (todoId: number) => string;
    BY_USER_ID: (userId: number) => string;
  };
}

export const URLS: IURLS = {
  POSTS: {
    ALL: () => 'https://jsonplaceholder.typicode.com/posts',
    BY_POST_ID: (postId: number) => `https://jsonplaceholder.typicode.com/posts/${postId}`,
    BY_USER_ID: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  },
  COMMENTS: {
    ALL: () => 'https://jsonplaceholder.typicode.com/comments',
    BY_POST_ID: (postId: number) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    BY_COMMENT_ID: (commentId: number) => `https://jsonplaceholder.typicode.com/comments/${commentId}`
  },
  ALBUMS: {
    ALL: () => 'https://jsonplaceholder.typicode.com/albums',
    BY_ALBUM_ID: (albumId: number) => `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    BY_USER_ID: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  },
  PHOTOS: {
    ALL: () => 'https://jsonplaceholder.typicode.com/photos',
    BY_PHOTO_ID: (photoId: number) => `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    BY_ALBUM_ID: (albumId: number) => `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  },
  TODOS: {
    ALL: () => 'https://jsonplaceholder.typicode.com/todos',
    BY_TODO_ID: (todoId: number) => `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    BY_USER_ID: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  }
};
