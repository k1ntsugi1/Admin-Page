import { RootState } from "../..";
import { selectorsAlbums } from "./dataAlbumsSlice";

export const selectAlbumsByTitle = (store: RootState, searchString: string) => {
    const { userId } = store.dataUser
    const albums = selectorsAlbums.selectAll(store);
    const albumsOfUser = userId === null ? albums : albums.filter(album => album.userId === userId);
    if(searchString === '') return albumsOfUser;
    return albumsOfUser.filter(album => album.title.includes(searchString));
}