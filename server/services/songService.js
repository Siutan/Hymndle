import fetch from 'node-fetch';
import dotenv from 'dotenv';
import {decode} from 'html-entities';

dotenv.config();

const getLyrics = async (artist, song) => {
    console.log(artist, song);
    // use genius api to search for song
    const geniusResponse = await fetch(`https://api.genius.com/search?q=${artist}%20${song}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.GENIUS_TOKEN}`
        }});
    const geniusData = await geniusResponse.json();
    const songData = {
        artist: geniusData.response.hits[0].result.primary_artist.name,
        song: geniusData.response.hits[0].result.title,
        url: geniusData.response.hits[0].result.url,
    }

    // DO YOUR LYRICS STUFF HERE
    const lyricsResponse = await fetch(songData.url);
    const lyricsResData = await lyricsResponse.text();
    console.log(lyricsResData);
    if (lyricsResData.includes('<div id="lyrics-root-pin-spacer">')) {
        const lyrics = lyricsResData.substring(lyricsResData.indexOf('<div id="lyrics-root-pin-spacer">')).replace(/<br[^>]*>/g, '\n')
        songData.lyrics = decode(lyrics.substring(0, lyrics.indexOf('<button'))).replaceAll(/<[/]?[^>]*>/g, '');
    }

    return songData;
}

export default {
    getLyrics
}