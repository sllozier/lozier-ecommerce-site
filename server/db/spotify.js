const axios = require("axios");
require("dotenv").config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const client_code = Buffer.from(
  `${spotify_client_id}:${spotify_client_secret}`
).toString("base64");

const getAuth = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const response = await axios.post(
      token_url,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${client_code}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

const getAlbumList = async () => {
  try {
    const access_token = await getAuth();

    const albumIds = [];

    let url =
      "https://api.spotify.com/v1/playlists/3XJLYtO90r6zpAn5nNCYkC/tracks?limit=100&locale=en-US,en;q=0.9";
    //first 100 albums
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    response.data.items.forEach((album) => {
      if (!albumIds.includes(album.track.album.id)) {
        albumIds.push(album.track.album.id);
      }
    });
    //next 100 albums
    url += "&offset=100";
    const resOffset = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    resOffset.data.items.forEach((album) => {
      if (!albumIds.includes(album.track.album.id)) {
        albumIds.push(album.track.album.id);
      }
    });
    return albumIds;
  } catch (error) {
    console.error(error);
  }
};

const getAlbumData = async () => {
  try {
    const access_token = await getAuth();
    const albumIds = await getAlbumList();

    const uniqueAlbumIds = albumIds.filter(
      (id, index, array) => array.indexOf(id) === index
    );
    let artists = [];
    let albums = [];

    //getting album data, 20 at a time
    for (let i = 0; i < Math.ceil(uniqueAlbumIds.length / 20); i++) {
      let setOfAlbumIds = uniqueAlbumIds.slice(i * 20, 20 + i * 20).join(",");

      let albumsResponse = await axios.get(
        `https://api.spotify.com/v1/albums?ids=${setOfAlbumIds}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      //get artists
      let setOfArtistIds = albumsResponse.data.albums.map(
        (album) => album.artists[0].id
      );
      let artistsResponse = await axios.get(
        `https://api.spotify.com/v1/artists?ids=${setOfArtistIds}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      albums = [...albums, ...albumsResponse.data.albums];
      artists = [...artists, ...artistsResponse.data.artists];
    }
    return [albums, artists];
  } catch (error) {
    console.error(error);
  }
};
//
module.exports = getAlbumData;
