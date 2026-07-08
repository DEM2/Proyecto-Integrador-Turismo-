import { obtenerSitiosDestacadosQ, obtenerEventosDestacadosQ } from "../querys/destacados.query.js";

export async function obtenerSitiosDestacados(req, res) {

    try {

        const sitiosDestacados = await obtenerSitiosDestacadosQ();
        res.json(sitiosDestacados);

    } catch (error) {
        console.error("Error al obtener sitios destacados:", error);
        res.status(500).json({ error: "Error al obtener sitios destacados" });
    }

}

export async function obtenerEventosDestacados(req, res) {

    try {

        const eventosDestacados = await obtenerEventosDestacadosQ();
        res.json(eventosDestacados);

    } catch (error) {
        console.error("Error al obtener eventos destacados:", error);
        res.status(500).json({ error: "Error al obtener eventos destacados" });
    }

}