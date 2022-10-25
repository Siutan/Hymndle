import playlistService from "../services/playlistService.js";

async function getPlaylist(req, res) {
    try {
        const tracks = await playlistService.getPlaylist(req.body["playlistId"]);
        res.send(tracks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    getPlaylist
}