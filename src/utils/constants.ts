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
    byPostId: (postId: string | number) => `https://jsonplaceholder.typicode.com/posts/${postId}`,
    delete:(postId: string | number) => `https://jsonplaceholder.typicode.com/posts/${postId}`,
  },
  comments: {
    all: () => 'https://jsonplaceholder.typicode.com/posts/comments',
    byPostId: (postId: string | number) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  }
};


export const dataOfNavBtns = {
  'postsPage': [{text: 'Создать', path: '/posts/create'}],
  'postPage': [{text: 'К постам', path: '/posts'}, {text: 'Редактировать', path: 'edit'}],
  'updatePostPage': [{text: 'Вернуться', path: '/posts'}],
}