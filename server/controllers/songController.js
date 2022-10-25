import songService from "../services/songService.js";

async function songLyrics(req, res) {
    try {
        const songList = await songService.getLyrics(req.body.artist, req.body.song);
        res.send(songList);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    songLyrics
}