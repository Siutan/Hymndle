import {
    dev
} from "$app/environment";


let url = "https://api.example.com";

if (dev) {
    console.log("Running in dev mode");
    url = "http://localhost:8000";
}

/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load({params}) {
    console.log("params", params.slug);
    try {
        const getPlaylists = await fetch(`${url}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "categoryId": params.slug
            })
        });
        const body = await getPlaylists.json();

        // pick a random item from the array
        const randomItem = body[Math.floor(Math.random() * body.length)];

        const getTracks = await fetch(`${url}/playlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "playlistId": randomItem.id
            })
        });
        const tracks = await getTracks.json();

        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        console.log("artist", randomTrack.artists[0].name);
        console.log("song", randomTrack.name);

        const getLyrics = await fetch(`${url}/lyrics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "artist": randomTrack.artists[0].name,
                "song": randomTrack.name
            })
        });
        //fix this
        const lyrics = await getLyrics;
        console.log("lyrics", lyrics);

        return {
            status: getTracks.status,
            tracks: tracks,
            masterTrack: randomTrack
        }

    } catch (err: unknown) {
        console.error(err);
        return err;
    }
}