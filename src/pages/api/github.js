import { URL_API } from "./config";

export const prerender = false;

export async function POST({ request }) {

    const body = await request.json();
    const calendar = await (
        await fetch(
            `${URL_API}/${body.user}/${body.year}`
        )
    ).json();

    return new Response(
        JSON.stringify(calendar), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
}