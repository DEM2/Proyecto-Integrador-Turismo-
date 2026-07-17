import { createDestinationByUser, getDestinationById } from "../querys/destinations.query.js";


export async function createDestinationService(placeData) {

    //Filtro de validación si existe el lugar

    const newDestination = await createDestinationByUser(placeData)

    return newDestination;
}

export async function getDestinationService(id_place){

    const getDestination = await getDestinationById(id_place)

    if(!getDestination){
        const error = new Error("Lugar no encontrado")
        error.statusCode = 404;
        throw error
    }

    return getDestination
}