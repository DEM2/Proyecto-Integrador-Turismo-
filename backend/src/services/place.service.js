import { createDestinationByUser } from "../querys/destinations.query";


export async function createDestinationService(placeData) {

    //Filtro de validación si existe el lugar

    const newDestination = await createDestinationByUser(placeData)

    return newDestination;
}