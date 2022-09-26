import axios from 'axios';

const initialState = {
  albums: [],
};

// action types
const SET_ALBUMS = 'SET_ALBUMS';
const SET_ALBUM = 'SET_ALBUM';

// action creators
const _setAlbums = (albums) => {
  // all albums
  return {
    type: SET_ALBUMS,
    albums,
  };
};

const _setAlbum = (album) => {
  // single album
  return {
    type: SET_ALBUM,
    album,
  };
};

// middleware
export const setAlbumsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: albums } = await axios.get('/api/products');
      dispatch(_setAlbums(albums));
    } catch (error) {
      console.log('setAlbumsThunk error: ', error);
    }
  };
};

export const setAlbumThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: album } = await axios.get(`/api/products/${id}`);
      dispatch(_setAlbum(album));
    } catch (error) {
      console.log('setAlbumThunk error: ', error);
    }
  };
};

// reducer
export default function albumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: action.albums };
    case SET_ALBUM:
      return { ...state, album: action.album };
    default:
      return state;
  }
};
