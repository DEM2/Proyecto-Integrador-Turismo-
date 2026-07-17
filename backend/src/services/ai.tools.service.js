import { searchPlaces } from "../querys/ai.places.query.js";
import { searchEvents } from "../querys/ai.events.query.js";
import { getCurrentBogotaDate, searchItineraries } from "../querys/ai.itineraries.query.js";


export async function executeAiTool(toolCall) {
    const toolName = toolCall?.function?.name;

    let args;

    try {
        args = JSON.parse(
            toolCall?.function?.arguments || "{}"
        );
    } catch {
        const error = new Error(
            `La herramienta ${toolName} recibió argumentos inválidos.`
        );

        error.statusCode = 502;
        error.code = "INVALID_TOOL_ARGUMENTS";

        throw error;
    }


    switch (toolName) {
        case "search_places": {
            const places = await searchPlaces(args);

            return {
                found: places.length > 0,
                count: places.length,
                places
            };
        }


        case "search_events": {
            const events = await searchEvents(args);

            return {
                found: events.length > 0,
                count: events.length,
                events,
                limitation:
                    "Los eventos incluyen fecha de inicio, fecha de finalización y hora de inicio. La hora exacta de finalización no está registrada."
            };
        }

        case "search_itineraries": {
            const [itineraries, currentDate] = await Promise.all([
                searchItineraries(args),
                getCurrentBogotaDate()
            ]);

            return {
                found: itineraries.length > 0,
                count: itineraries.length,
                filter_used: args.date_filter || "upcoming",
                current_date: currentDate,
                itineraries
            };
        }

        default: {
            const error = new Error(
                `La herramienta ${toolName} no está soportada.`
            );

            error.statusCode = 502;
            error.code = "UNSUPPORTED_AI_TOOL";

            throw error;
        }
    }
}