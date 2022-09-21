import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbumThunk } from '../../store/reducers2/albumReducer';
import { useParams } from 'react-router-dom';

function SingleAlbum() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const album = useSelector((state) => state.albums.album);

  useEffect(() => {
    dispatch(setAlbumThunk(id));
  }, [dispatch]);

  useEffect(() => {
    if (album) {
      setLoading(false);
    }
  }, [album]);

  return loading ? (
    <div>Loading Album...</div>
  ) : (
    <div>
      <img src={album.image} alt="" style={{ height: '500px' }} />
      {/* TODO: move all styling to css file */}
      <div>{album.title}</div>
      <div>${album.price}</div>
      <div>{album.stock} left in store</div>
      <div>{album.description}</div>
    </div>
  );
}

export default SingleAlbum;
