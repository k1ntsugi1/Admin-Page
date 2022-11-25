export const sizesOfIcons = {
  s: {
    width: '25',
    height: '25'
  },
  m: {
    width: '35',
    height: '35'
  },
  l: {
    width: '45',
    height: '45'
  }
};


export const LoadingStatuses = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
};

export const urls = {
  posts: {
    all: () => 'https://jsonplaceholder.typicode.com/posts',
    byPostId: (postId: number) => `https://jsonplaceholder.typicode.com/posts/${postId}`,
    byUserId: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  },
  comments: {
    all: () => 'https://jsonplaceholder.typicode.com/posts/comments',
    byPostId: (postId: number) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    byCommentId: (commentId: number) => `https://jsonplaceholder.typicode.com/comments/${commentId}`
  },
  albums: {
    all: () => 'https://jsonplaceholder.typicode.com/albums',
    byAlbumId : (albumId: number) => `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    byUserId: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
  },
  photos: {
    all: () => 'https://jsonplaceholder.typicode.com/photos',
    byPhotoId: (photoId: number) => `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    byAlbumId: (albumId: number) => `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
  },
  todos: {
    all: () => 'https://jsonplaceholder.typicode.com/todos',
    byTodoId: (todoId: number) => `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    byUserId: (userId: number) => `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
  }
};


export const dataOfNavBtns = {
  'postsPage': [{text: 'Создать', path: '/posts/create'}],
  'postPage': [{text: 'К постам', path: '/posts'}, {text: 'Редактировать', path: 'edit'}],
  'updatePostPage': [{text: 'Вернуться', path: '/posts'}],
  'albumsPage': [{text: 'Создать', path: '/albums/create'}],
  'albumPage': [{text: 'К альбомам', path: '/albums'}, {text: 'Редактировать', path: 'edit'}],
  'updateAlbumPage': [{text: 'Вернуться', path: '/albums'}],
}