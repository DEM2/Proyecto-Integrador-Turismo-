import * as authService from "../services/auth.service.js";

export async function register(req, res) {

    try {

        const user = await authService.register(req.body);

        res.status(201).json(user);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

}