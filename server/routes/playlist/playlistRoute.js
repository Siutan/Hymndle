import express from 'express';
const router = express.Router();


import playlistController from "../../controllers/playlistController.js";
router.post('/', (playlistController.getPlaylist));


// default export
export default router;