import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumData } from '../../store/reducers/albumSlice';
import { addItem } from '../../store/reducers/orderSlice';
import { useParams, Link } from 'react-router-dom';


const ViewSingleAlbum = () => {
  const album = useSelector((state) => state.album.albumData);
  const artist = album.artist || {};
  const params = useParams();
  const dispatch = useDispatch();
  const [ playingId, setPlayingId ] = useState(-1);

  console.log('SING ALBUM TRACKS', album)

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  useEffect(() => {
    dispatch(fetchAlbumData(params.id));
  }, [params.id]);

  const convertTrackLength = (length) => {
    let trackLength = Math.round((100 * length) / 60000) / 100;
    let seconds = Math.round((trackLength % 1) * 60);
    if(seconds < 10) seconds = `0${seconds}`;
    let trackString = `${Math.floor(trackLength)}:${seconds}`;
    return trackString;
  }

  const toTitleCase = (string) => {
    return string.replace(/\w\S*/g, function(text) {
      return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    });
  }

  const displayPrice = (price) => {
    price /= 100;
    price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `$${price}`;
  }

  const handleClickAudio = (id) => {
    const previousTrack = Array.from(document.getElementsByClassName('playing'))[0];
    if(previousTrack){
      previousTrack.classList.toggle('playing');
      previousTrack.pause();
      previousTrack.currenttime = 0;
    }
    if(id === playingId) return setPlayingId(-1);
    setPlayingId(id);
    const nextTrack = document.getElementById(id);
    nextTrack.volume = 0.2;
    nextTrack.play();
    nextTrack.classList.toggle('playing');
  }

    return(
      <section className='section'>
        <div className='container'>
          <div className='columns is-12 is-variable'>
            <div className='column is-9-desktop is-5-tablet'>
              <div className='card'>
                <div className='card-image has-text-centered'>
                  <img src={album.image}/>
                </div>
                <div className='card-content'>
                  <p className='title is-size-5'>Title: {album.name}</p>
                  <Link to={`/singleArtist/${artist.id}`}>
                    <p className='sub-title'>Artist: {artist.name}</p>
                  </Link>
                  <p className='title is-size-5'>Label: {album.label}</p>
                  {artist.genre ? (
                    <p className='title is-size-5'>Genre: {toTitleCase(artist.genre)}</p>
                  ) : (
                    <p className='title is-size-5'>Genre: N/A</p>
                  )}
                  <p className='title is-size-5'>Date Released: {album.releaseDate}</p>
                </div>
                <footer className='card-footer'>
                  <div className='card-footer-item'>
                <p className='title is-size-5'>Tracks: {album.totalTracks}</p>
                <div id='playlist'>
                  <div className='list has-overflow-ellipsis has-visible-pointer-controls has-hoverable-list-items'>
                    {album.tracks &&
                    album.tracks.map(track => (
                      <div className='list-item' key={track.id}>
                        <div className='list-item-content'>
                          <div className='list-item-title'>
                            {track.name}
                          </div>
                          <div className='description'>
                            {artist.name} . {convertTrackLength(track.length)}
                            {track.length < 6000 ? 'seconds' : 'minutes'}
                          </div>
                          <div className='list-item-controls'>
                            <div className='buttons'>
                              {track.preview ? (
                                <>
                                <audio
                            preload="auto"
                            src={track.preview}
                            id={track.id}>
                            </audio>
                          {playingId !== track.id ? (
                            <button className='button is-primary' onClick={() => handleClickAudio(track.id)}>
                              <span className='icon is-medium mr-2'>
                                <i className='fa-solid fa-circle-play'></i>
                            </span>
                            </button>
                            
                          ) : (
                            <button className='button is-black' onClick={() => handleClickAudio(track.id)}>
                              <span className='icon is-medium mr-2'>
                                <i className='fa-solid fa-circle-stop'></i>
                              </span>
                            </button>
                          )}
                                </>
                              ) : (
                                'Preview Not Available'
                              )}
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
                <div className='card-footer-item'>
                <h4>Price: {displayPrice(album.price)}</h4>
        <div className='single-album-buttons'>
          <button className={`album-button single-view-button button is-dark ${album.stock > 0 ? '' : 'disabled'}`}
            onClick={album.stock > 0 ?
            () => dispatch(addItem(album.id)) : null}>
              {album.stock > 0 ? 'Add to Cart' : 'Not in stock'}
            </button>
            <Link to={'/'}>
              <button className='album-button single-view-button button is-dark'>
                <span className='icon is-medium'>
                  <i className='fa-solid fa-house-user'></i>
                </span>
                <span>Home</span>
              </button>
            </Link>
            </div>
            </div>
                </footer>
              </div>

            </div>
          </div>
        </div>
      </section>

      // <div className='single-album'>
      //   <div className='single-album-image-info'>
      //     <div className='single-album-image'>
      //       <img src={album.image} height='250px' width='250px'/>
      //     </div>
      //     <div className='single-album-info'>
      //       <h4>Title: {album.name}</h4>
      //       <Link to={`/singleArtist/${artist.id}`}>
      //         <h4>Artist: {artist.name}</h4>
      //       </Link>
      //       <h4>Label: {album.label}</h4>
      //       {artist.genre ? (
      //         <h4>Genre: {toTitleCase(artist.genre)}</h4>
      //       ) : (
      //         <h4>Genre: N/A</h4>
      //       )}
      //       <h4>Date Released: {album.releaseDate}</h4>
      //     </div>
      //   </div>
      //   <div className='single-album-tracks'>
      //         <h5>Tracks: {album.totalTracks}</h5>
      //         <ol>
      //           {album.tracks &&
      //           album.tracks.map(track => (
      //             <li key={track.id} className="track">
      //               <div className='individual-track'>
      //                 Name: {track.name} <br></br>Length:{' '}
      //                 {convertTrackLength(track.length)}{' '}
      //                 {track.length < 60000 ? 'seconds' : 'minutes'}
      //               </div>
      //               <div className='play-button'>
      //                 {track.preview ? (
      //                   <>
      //                     <audio
      //                       preload="auto"
      //                       src={track.preview}
      //                       id={track.id}>
      //                       </audio>
      //                     {playingId !== track.id ? (
      //                       <button className='button is-primary' onClick={() => handleClickAudio(track.id)}>
      //                         <span className='icon is-medium mr-2'>
      //                           <i className='fa-solid fa-circle-play'></i>
      //                       </span>
      //                       </button>
                            
      //                     ) : (
      //                       <button className='button is-black' onClick={() => handleClickAudio(track.id)}>
      //                         <span className='icon is-medium mr-2'>
      //                           <i className='fa-solid fa-circle-stop'></i>
      //                         </span>
      //                       </button>
      //                     )}
      //                   </>
      //                 ) : (
      //                   'Preview Not Available'
      //                 )}
      //               </div>
      //             </li>
      //           ))}
      //         </ol>
      //   </div>
      //   <h4>Price: {displayPrice(album.price)}</h4>
      //   <div className='single-album-buttons'>
      //     <button className={`album-button single-view-button button is-dark ${album.stock > 0 ? '' : 'disabled'}`}
      //       onClick={album.stock > 0 ?
      //       () => dispatch(addItem(album.id)) : null}>
      //         {album.stock > 0 ? 'Add to Cart' : 'Not in stock'}
      //       </button>
      //       <Link to={'/'}>
      //         <button className='album-button single-view-button button is-dark'>
      //           <span className='icon is-medium'>
      //             <i className='fa-solid fa-house-user'></i>
      //           </span>
      //           <span>Home</span>
      //         </button>
      //       </Link>
      //   </div>
      // </div>
    )
        }
      
    


export default ViewSingleAlbum;
