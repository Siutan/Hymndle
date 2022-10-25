import fetch from 'node-fetch';
import dotenv from 'dotenv';
import authMiddleware from "../middlewares/auth/authMiddleware.js";

dotenv.config();

const token = await authMiddleware.checkToken();

const categoryNames = ["Top Lists", "Trending", "Pop", "Hip-Hop", "Rock", "R&B", "Country", "Dance", "K-Pop", "Electronic", "Indie", "Jazz", "Latin", "Metal", "Punk", "Reggae", "World", "Funk"];

const getPlaylistsByCategory = async (catId) => {
    console.log("token: " + await token);
    const response = await fetch("https://api.spotify.com/v1/browse/categories/" + catId + "/playlists", {
        method: 'GET',
        headers: {Authorization: "Bearer " + await token}
    });
    const data = await response.json();
    // filter out playlists with null
    return data.playlists.items.filter((item) => {
        return item !== null;
    }).map((item, index) => {
        return {
            index: index,
            id: item.id,
            name: item.name,
            image: item.images[0].url,
        };
    });
}

const getCategories = async () => {
    const response = await fetch("https://api.spotify.com/v1/browse/categories?limit=50", {
        method: 'GET',
        headers: {Authorization: "Bearer " + await token}
    });
    console.log(response);
    const data = await response.json();

    // only return the categories with names matching the categoryNames array
    return data.categories.items.filter((item) => {
        return categoryNames.includes(item.name);
    }).map((item, index) => {
        return {
            id: index,
            catId: item.id,
            name: item.name,
            image: item.icons[0].url
        }
    });
}


export default {
    getPlaylistsByCategory,
    getCategories
}