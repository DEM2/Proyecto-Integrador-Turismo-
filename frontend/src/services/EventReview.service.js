import { apiUrl } from "./apiConfig.js";

export async function createReview(id_event, review) {

    const response = await fetch(
        apiUrl(`/api/events/${id_event}/reviews`),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        }
    );

    if (!response.ok) {
        throw new Error("Error al guardar el comentario.");
    }

    return await response.json();

}

export async function getReviews(id_event) {

    const response = await fetch(
        apiUrl(`/api/events/${id_event}/reviews`)
    );

    if (!response.ok) {
        throw new Error("No fue posible obtener los comentarios.");
    }

    const data = await response.json();

    return data.data;

}