import { getDestinations } from "../querys/destinations.query.js";

export async function destinations(req, res) {
    
    try {

        const destinations = await getDestinations();
        res.json(destinations);

    } catch (error) {
        res.status(500).json({ error: "Error al obtener los destinos" });
    }

}