const axios = require('axios');
require('dotenv').config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const client_code = Buffer.from(
    `${spotify_client_id}:${spotify_client_secret}`
).toString('base64');


const fetchAuth = async() => {
    try{
        const token_url = "https://accounts.spotify.com/api/token";
        const res = await axios.post(
            token_url,
            'grant_type=client_credentials',{
                headers: {
                    Authorization: `Basic ${client_code}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return res.data.access_token;
    }catch(error){
        console.error(error);
    }
};

const getAlbumList = async() => {
    try{
        const access_token = await fetchAuth();
        const albumIdNums = [];
        let url = "https://api.spotify.com/v1/browse/new-releases?limit=50";
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        res.data.albums.items.forEach(album => albumIdNums.push(album.id));
        url += '&offset=50';
        const resOffset = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        resOffset.data.albums.items.forEach(album => albumIdNums.push(album.id));
        return albumIdNums;
    }catch(error){
        console.error(error);
    }
};

const getAlbumData = async()=> {
    try{
        const access_token = await fetchAuth();
        const albumIdNums = await getAlbumList();
        const uniqueAlbumIds = albumIdNums.filter((id, index, array) => array.indexOf(id) === index);
        let artists = [];
        let albums = [];

            for(let i = 0; i < Math.ceil(uniqueAlbumIds.length / 20); i++){
                let setOfAlbumIds = uniqueAlbumIds
                .slice(i * 20, 20 + i * 20)
                .join(',')
        let albumsRes = await axios.get(`https://api.spotify.com/v1/albums?ids=${setOfAlbumIds}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        let setOfArtistIds = albumsRes.data.albums.map(album => album.artists[0].id);
        let artistsRes = await axios.get(`https://api.spotify.com/v1/artists?ids=${setOfArtistIds}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
      
        albums = [...albums, ...albumsRes.data.albums];
        artists = [...artists, ...artistsRes.data.artists];
            }
            return [albums, artists];
    }catch(error){
        console.error(error);
    }
}
//
module.exports = getAlbumData;
