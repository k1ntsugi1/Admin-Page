import { RootState } from "../..";
import { selectorsAlbums } from "./dataAlbumsSlice";

export const selectAlbumsByTitle = (store: RootState, searchString: string) => {
    const albums = selectorsAlbums.selectAll(store);
    if(searchString === '') return albums;
    return albums.filter(album => album.title.includes(searchString));
}