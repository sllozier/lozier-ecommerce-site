import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumData } from '../../store/reducers/albumSlice';
import { updateQuantities, createCart } from '../../store/reducers/cartSlice';
import { useParams } from 'react-router-dom';
//import { createCart, updateQuantities } from '../../store/reducers1/cartReducer';

const ViewSingleAlbum = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ productId, setProductId ] = useState(Infinity);
  const [ productAmount, setProductAmount ] = useState(1);
  const album = useSelector((state) => state.album.albumData);
  const auth = useSelector((state) => state.account);
  const cart = useSelector((state) => state.cart);

console.log('SINGLE ALBUM', album);
  //console.log('ALBUM AUTH', auth);
  //console.log('GUEST CART', cart);

  useEffect(() => {
    dispatch(fetchAlbumData(id));
  }, [dispatch]);

  useEffect(() => {
    if (album) {
      setLoading(false);
      setProductId(album.id);
    }
  }, [album]);

  const changeAmount = prop => (event) => {
    setProductAmount({
      ...productAmount,
      [prop]: event.target.value
    })
  }
  
  
  const accountId = auth.id || 0;
  let UUID = cart.UUID || 'empty';
  if(accountId == 0 && UUID == 'empty' && localStorage.UUID !== undefined){
    UUID = localStorage.getItem('UUID');
  }
   
//   const handleChange = (props) => (event) => {
//     setAddProduct({
//         ...addProduct,
//         [props]: event.target.value,
//     });
// };

//   const handleAddProduct = () => {
//     if(productId !== Infinity){
//       dispatch(createCart(productId, accountId, UUID));
//       setProductId(Infinity);
//     }
//     if()
//   }
  

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

        <p>{album.stock > 0 ? 'in stock' : 'out of stock'}</p>
        {album.stock > 0 ? 
          <><a><input type='number' min='1' max={album.stock} size='2' onChange={(event) =>
          changeAmount(Number(event.target.value))}></input>
          <p>{Number(album.price).toFixed(2)}</p>
          <button onClick={() => {
            if(productId !== Infinity){
              dispatch(createCart(productId, accountId, UUID));
              //dispatch(updateQuantities(cartId, UUID, productId, 'increment', 1))
              setProductId(Infinity)
            } 
          }}>Add to Cart</button>
        </a></> : <a><p>Out of stock, check again soon!</p></a>
        }
      </div>
      
    </div>
  );
        }
      
    


export default ViewSingleAlbum;
