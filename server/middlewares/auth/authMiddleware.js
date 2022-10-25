import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

let token;

//check if spotify token exists or expired and refresh it
const checkToken = async () => {
    if (!token || token.expires_at < Date.now()) {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(process.env.HYMN_ID + ':' + process.env.HYMN_SECRET).toString('base64'))
            },
            body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        if (data.access_token) {
            token = data;
            token.expires_at = Date.now() + data.expires_in * 1000;
            console.log("token refreshed");
        }
    }
    return token.access_token;
}


export default {
    checkToken
}