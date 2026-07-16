import {
  createItineraryQ,
  getUserItinerariesQ,
  addPlaceToItineraryQ,
  addEventToItineraryQ,
  getItineraryDetailQ,
  getItineraryByIdQuery,
  deleteItineraryQ
} from "../querys/intinerary.query.js";

/* Crear itinerario */
export async function createItinerary(req, res) {
  try {

    const {
      name,
      description,
      start_date,
      closing_date,
      is_public,
      id_user
    } = req.body;

    const itinerary = await createItineraryQ(
      name,
      description,
      start_date,
      closing_date,
      is_public,
      id_user
    );

    return res.status(201).json({
      ok: true,
      message: "Itinerario creado correctamente",
      data: itinerary,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }
}

/* Obtener itinerarios */
export async function getUserItineraries(req, res) {
  
  try {

    const { id } = req.params;
    
    const itineraries = await getUserItinerariesQ(id);

    return res.json({
      ok: true,
      data: itineraries,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

}

/* Agregar lugar */
export async function addPlaceToItinerary(req, res) {

  try {

    const { id } = req.params;

    const { id_place } = req.body;

    await addPlaceToItineraryQ(id, id_place);

    return res.json({
      ok: true,
      message: "Lugar agregado correctamente",
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

}

/* Agregar evento */
export async function addEventToItinerary(req, res) {
  console.log("hello como estas ")
  try {

    const { id } = req.params;

    const { id_event } = req.body;

    await addEventToItineraryQ(id, id_event);

    return res.json({
      ok: true,
      message: "Evento agregado correctamente",
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

}

/* Obtener detalle */
export async function getItineraryDetail(req, res) {

  try {

    const { id } = req.params;

    const itinerary = await getItineraryDetailQ(id);

    return res.json({
      ok: true,
      data: itinerary,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

}

export async function getItineraryById(req, res) {

    try {
      
        const itinerary = await getItineraryByIdQuery(req.params.id);

        res.json({
            ok: true,
            data: itinerary
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}

export async function deleteItinerary(req, res) {

  try {

    const { id } = req.params;

    const deleted = await deleteItineraryQ(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: "Itinerario no encontrado",
      });
    }

    return res.json({
      ok: true,
      message: "Itinerario eliminado correctamente",
      data: deleted,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

}