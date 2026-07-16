import {
    createReview,
    getEventReviews
} from "../querys/eventReview.query.js";

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

export async function getEventReviewsController(req, res) {

    try {

        const { id_event } = req.params;

        const reviews = await getEventReviews(id_event);

        res.status(200).json({
            ok: true,
            data: reviews
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            message: "Error interno"
        });

    }

}