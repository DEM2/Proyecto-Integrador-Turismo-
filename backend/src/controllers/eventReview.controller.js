import { createReview } from "../querys/eventReview.query.js";

export async function saveEventReviewController(req,res){

    try{

        const { id_event } = req.params;

        const review = {
            ...req.body,
            id_event
        };

        const result = await createReview(review);

        res.status(201).json({
            ok:true,
            message:"Comentario guardado",
            data:result
        });

    }catch(error){

        console.error(error);

        res.status(500).json({
            ok:false,
            message:"Error interno"
        });

    }

}