import { getDestinations } from "../querys/destinations.query.js";
import { createDestinationService } from "../services/place.service.js";

export async function destinations(req, res) {
    
    try {

        const destinations = await getDestinations();
        res.json(destinations);

    } catch (error) {
        res.status(500).json({ error: "Error al obtener los destinos" });
    }

}

export async function createDestinationController(req, res) {
    try{
        const placeData = req.body

        const newPlace = await createDestinationService(placeData)

        return res.status(201).json({
            ok: true,
            message: "Lugar creado correctamente",
            data: newPlace
        })
    }catch(error){
        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message || "Error interno del servidor"
        })
    }
}