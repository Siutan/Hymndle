import fetch from 'node-fetch';
import dotenv from 'dotenv';
import * as Console from "console";

dotenv.config();

const getAuth = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(process.env.HYMN_ID + ':' + process.env.HYMN_SECRET).toString('base64'))
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    Console.log(data);
    return data;
}

export default {
    getAuth
}