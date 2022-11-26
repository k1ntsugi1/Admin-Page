type IDataNavigationBtn = {
    [index: string]: string;

    text: string;
    path: string;
}

interface IDataOfNavigationBtns {
  [index: string]: IDataNavigationBtn[];

  postsPage: IDataNavigationBtn[];
  postPage: IDataNavigationBtn[];
  updatePostPage: IDataNavigationBtn[];
  albumsPage: IDataNavigationBtn[];
  albumPage: IDataNavigationBtn[];
  updateAlbumPage: IDataNavigationBtn[];
}

export const DataOfNavigationBtns: IDataOfNavigationBtns = {
  postsPage: [{text: 'Создать', path: '/posts/create'}],
  postPage: [{text: 'К постам', path: '/posts'}, {text: 'Редактировать', path: 'edit'}],
  updatePostPage: [{text: 'Вернуться', path: '/posts'}],
  albumsPage: [{text: 'Создать', path: '/albums/create'}],
  albumPage: [{text: 'К альбомам', path: '/albums'}, {text: 'Редактировать', path: 'edit'}],
  updateAlbumPage: [{text: 'Вернуться', path: '/albums'}],
}