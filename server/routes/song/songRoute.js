import express from 'express';
const router = express.Router();

import songController from "../../controllers/songController.js";

// get live by name
router.get('/', (songController.songList));


// default export
export default router;