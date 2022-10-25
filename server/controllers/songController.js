import songService from "../services/songService.js";

async function songList(req, res) {
    try {
        const songList = await songService.getAuth();
        res.send(songList);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    songList
}