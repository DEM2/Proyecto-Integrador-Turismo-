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

export async function login(req, res) {
     
    try{
        const credentials = req.body;
        const loginResult = await authService.loginUserService(credentials)
      
      console.log(loginResult)
        res.status(200).json({
            ok: true,
            message: "Login Exitoso",
            data: loginResult,
        });
    }catch (error){
        return res.status(500).json({
            ok: false,
            message: "Error intero del servidor",
        })
    }
}