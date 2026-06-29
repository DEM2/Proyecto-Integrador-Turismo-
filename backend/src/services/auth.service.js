import * as userRepository from "../querys/user.query.js";

export async function register(userData) {

    const userExists = await userRepository.findByEmail(userData.email);

    if(userExists){

        throw new Error("El correo ya está registrado.");

    }

    // Aquí después iría bcrypt

    // Aquí después iría JWT

    const user = await userRepository.create(userData);

    return user;

}