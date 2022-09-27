import axios from 'axios';

const SET_ALBUM = 'SET_ALBUM';

const _setAlbum = (album) => {
    // single album
    return {
      type: SET_ALBUM,
      album,
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

  export default function singleAlbumReducer(state = [], action) {
    switch (action.type) {
      case SET_ALBUM:
        return action.album;
      default:
        return state;
    }
  };