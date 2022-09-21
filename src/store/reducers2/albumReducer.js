import axios from 'axios';
const initialState = {
  albums: [],
};
// action types
const SET_ALBUMS = 'SET_ALBUMS';
// action creators
const _setAlbums = (albums) => {
  return {
    type: SET_ALBUMS,
    albums,
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
// reducer
export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: action.albums };
    default:
      return state
  }
}