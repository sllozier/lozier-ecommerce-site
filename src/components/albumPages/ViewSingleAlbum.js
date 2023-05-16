import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumData } from "../../store/reducers/albumSlice";
import { addItem } from "../../store/reducers/orderSlice";
import { createCart } from "../../store/reducers/cartSlice";
import { useParams, Link } from "react-router-dom";

const ViewSingleAlbum = () => {
  const album = useSelector((state) => state.album);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const artist = album.artist || {};
  const [productAmount, setProductAmount] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const [playingId, setPlayingId] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchAlbumData(params.id));
  }, [params.id]);

  const convertTrackLength = (length) => {
    let trackLength = Math.round((100 * length) / 60000) / 100;
    let seconds = Math.round((trackLength % 1) * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    let trackString = `${Math.floor(trackLength)}:${seconds}`;
    return trackString;
  };

  const toTitleCase = (string) => {
    return string.replace(/\w\S*/g, function (text) {
      return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    });
  };

  const handleClickAudio = (id) => {
    const previousTrack = Array.from(
      document.getElementsByClassName("playing")
    )[0];
    if (previousTrack) {
      previousTrack.classList.toggle("playing");
      previousTrack.pause();
      previousTrack.currenttime = 0;
    }
    if (id === playingId) return setPlayingId(-1);
    setPlayingId(id);
    const nextTrack = document.getElementById(id);
    nextTrack.volume = 0.2;
    nextTrack.play();
    nextTrack.classList.toggle("playing");
  };

  const changeAmount = (prop) => (event) => {
    setProductAmount({
      ...productAmount,
      [prop]: event.target.value,
    });
  };

  const accountId = auth.id || 0;
  let UUID = cart.UUID || "empty";
  if (accountId == 0 && UUID == "empty" && localStorage.UUID !== undefined) {
    UUID = localStorage.getItem("UUID");
  }

  console.log("ALBUM", album);

  return (
    <section className="section is-family-monospace">
      <div className="container">
        <div className="columns is-12 is-variable">
          <div className="column is-9-desktop is-5-tablet">
            <div className="card">
              <div className="card-image has-text-centered">
                <img src={album.image} />
              </div>
              <div className="card-content">
                <h1 className="title is-4 mb-2">Title: {album.name}</h1>
                <div className="list has-visible-pointer-controls">
                  <div className="list-item">
                    <div className="list-item-content">
                      <div className="list-item-title">
                        <Link to={`/singleArtist/${artist.id}`}>
                          <p>Artist: {artist.name}</p>
                        </Link>
                        <p>Label: {album.label}</p>
                        {artist.genre ? (
                          <p>Genre: {toTitleCase(artist.genre)}</p>
                        ) : (
                          <p>Genre: N/A</p>
                        )}
                        <p>Date Released: {album.releaseDate}</p>
                      </div>
                    </div>
                    <div className="list-item-controls">
                      <div className="is-flex is-align-items-center">
                        <span>Price: ${album.price}</span>
                        <div className="control ml-3 is-hidden-mobile">
                          <input
                            className="input is-primary"
                            type="number"
                            min="1"
                            max={album.stock}
                            style={{ width: "7ch" }}
                            onChange={(event) =>
                              changeAmount(Number(event.target.value))
                            }
                          ></input>
                        </div>
                        <div className="buttons ml-3">
                          <button
                            className={`album-button single-view-button button is-dark ${
                              album.stock > 0 ? "" : "disabled"
                            }`}
                            onClick={
                              album.stock > 0
                                ? () =>
                                    dispatch(
                                      createCart(
                                        album.id,
                                        accountId,
                                        UUID,
                                        changeAmount()
                                      )
                                    )
                                : null
                            }
                          >
                            <span className="icon">
                              <i className="fa-solid fa-cart-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <p className="title is-size-5">{album.totalTracks}</p>
                  <div id="playlist">
                    <div className="list has-overflow-ellipsis has-visible-pointer-controls has-hoverable-list-items">
                      {album.tracks &&
                        album.tracks.map((track) => (
                          <div className="list-item" key={track.id}>
                            {/* image section */}
                            <div className="list-item-image">
                              <figure className="image is-64x64">
                                <img src={album.image} />
                              </figure>
                            </div>
                            {/* content section */}
                            <div className="list-item-content">
                              <div className="list-item-title">
                                {track.name}
                              </div>
                              <div className="description">
                                {convertTrackLength(track.length)}
                                {track.length < 6000 ? "seconds" : "minutes"}
                              </div>
                            </div>
                            <div className="list-item-controls">
                              <div className="buttons">
                                {track.preview ? (
                                  <>
                                    <audio
                                      preload="auto"
                                      src={track.preview}
                                      id={track.id}
                                    ></audio>
                                    {playingId !== track.id ? (
                                      <button
                                        className="button is-light is-hidden-mobile"
                                        onClick={() =>
                                          handleClickAudio(track.id)
                                        }
                                      >
                                        <span className="icon">
                                          <i className="fa-solid fa-play"></i>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        className="button is-light is-hidden-mobile"
                                        onClick={() =>
                                          handleClickAudio(track.id)
                                        }
                                      >
                                        <span className="icon">
                                          <i className="fa-solid fa-stop"></i>
                                        </span>
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  "Preview Not Available"
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>

    // {/* <div class="list-item">
    //   //image section

    //         <div class="list-item-image">
    //           <figure class="image is-64x64">
    //             <img src="https://ia801504.us.archive.org/35/items/mbid-2e999a18-f74d-49f4-8e01-d4f354ad5a32/mbid-2e999a18-f74d-49f4-8e01-d4f354ad5a32-30261100157.jpg" alt="Friends That Break Your Heart">
    //           </figure>
    //         </div>

    // //content section
    //         <div class="list-item-content">
    //           <div class="list-item-title">
    //             Life Is Not The Same
    //           </div>
    //           <div class="description">
    //             James Blake · 3:20
    //           </div>
    //         </div>

    //         //controls section

    //         <div class="list-item-controls">
    //           <div class="buttons">
    //             <button class="button is-light is-hidden-mobile">
    //               <span class="icon">
    //                 <i class="fas fa-play"></i>
    //               </span>
    //             </button>
    //             <button class="button is-light is-hidden-mobile">
    //               <span class="icon">
    //                 <i class="fas fa-heart"></i>
    //               </span>
    //             </button>
    //             <button class="button is-light">
    //               <span class="icon">
    //                 <i class="fas fa-ellipsis-v"></i>
    //               </span>
    //             </button>
    //           </div>
    //         </div>

    //       </div> */}

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
  );
};

export default ViewSingleAlbum;
