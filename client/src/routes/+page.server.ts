import { dev } from "$app/environment";
import type {Actions} from "@sveltejs/kit";
import {error} from "@sveltejs/kit";

let url = "https://api.example.com";

if (dev) {
    console.log("Running in dev mode");
    url = "http://localhost:8000";
}

export async function load() {
    try {
        const response = await fetch(`${url}/categories`);
        const body = await response.json();
        return {
            status: response.status,
            body: body
        };
    } catch (err: unknown) {
        console.error(err);
        return err;
    }
}