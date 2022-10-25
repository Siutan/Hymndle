import fetch from 'node-fetch';
import dotenv from 'dotenv';
import authMiddleware from "../middlewares/auth/authMiddleware.js";

dotenv.config();

const token = await authMiddleware.checkToken();

const getPlaylist = async (playlistId) => {
    console.log("token: " + await token);
    const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", {
        method: 'GET',
        headers: {Authorization: "Bearer " + await token}
    });
    const data = await response.json();
    return data.items.map((item, index) => {
        return {
            index: index,
            id: item.track.id,
            name: item.track.name,
            album: {
                id: item.track.album.id,
                name: item.track.album.name,
                albumType: item.track.album.album_type,
            },
            artists: item.track.artists.map((artist) => {
                return {
                    id: artist.id,
                    name: artist.name
                }
            }),
            image: item.track.album.images[0].url,
            releaseMonth: item.track.album.release_date.substring(5, 7),
            releaseYear: item.track.album.release_date.substring(0, 4),
        }
    });
}


export default {
    getPlaylist
}