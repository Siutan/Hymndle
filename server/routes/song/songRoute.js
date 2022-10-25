import express from 'express';
const router = express.Router();

import songController from "../../controllers/songController.js";

// get live by name
router.post('/lyrics', (songController.songLyrics));


// default export
export default router;