import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbumThunk } from '../../store/reducers1/singleAlbumReducer';
import { useParams } from 'react-router-dom';
import { createCart } from '../../store/reducers1/cartReducer';

function SingleAlbum() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ productId, setProductId ] = useState(Infinity);
  const album = useSelector((state) => state.singleAlbum);
  const auth = useSelector((state) => state.account);
  const cart = useSelector((state) => state.cart);

console.log('SINGLE ALBUM', album);
  console.log('ALBUM AUTH', auth);
  console.log('CART AUTH', cart);

  useEffect(() => {
    dispatch(setAlbumThunk(id));
  }, [dispatch]);

  useEffect(() => {
    if (album) {
      setLoading(false);
      setProductId(album.id);
    }
  }, [album]);

  console.log('SING ALBUM ITEMID', productId);
  
  const accountId = auth.id || 0;
  let UUID = cart.UUID || 'empty';
  if(accountId === 0 && UUID === 'empty' && localStorage.UUID !== undefined){
    UUID = localStorage.getItem('UUID');
  }

  
  

  return loading ? (
    <div>Loading Album...</div>
  ) : (
    <div className='single-album-container' key={productId}>
      <div>
        <img src={album.image} alt="" style={{ height: '500px' }} />
      </div>

      {/* TODO: move all styling to css file */}
      <div>
        <h2>{album.title}</h2>
        <h2>${album.price}</h2>
        <h4>{album.stock} left in store</h4>
        <p className='single-album-desc'>{album.description}</p>
        <button onClick={() => {
          if(productId !== Infinity){
            dispatch(createCart(productId, accountId, UUID));
          }
        }}>Add to Cart</button>
      </div>

    </div>
  );
}

export default SingleAlbum;
