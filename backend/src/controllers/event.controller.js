import * as authEvent from "../services/event.service.js";


//req --> peteición que realiza el cliente al backend, Express
//        organiza la información en el objeto req, si el cliente
//        solicita events/15 Express lo almacena 
//        req.params { id: "15"}

export async function getEventController(req, res) {
    
    try{
        console.log(req.params);
        const { id_event } = req.params;

        const eventDetail = await authEvent.getEventService(id_event)
        
        if(!eventDetail){
            res.status(404).json({
                ok: false,
                message: "Evento no encontrado",
            })
            return
        }

        res.status(200).json({
            ok: true,
            message: "Consulta de evento exitosa",
            data: eventDetail,
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor"
        })
    }
}

