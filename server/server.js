import express from 'express';
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Hymndle Server!');
});

import categoryRoute from "./routes/category/categoryRoute.js";
app.use('/categories', categoryRoute)

import playlistRoute from "./routes/playlist/playlistRoute.js";
app.use('/playlist', playlistRoute)

import songRoute from "./routes/song/songRoute.js";
app.use('/song', songRoute)


app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);