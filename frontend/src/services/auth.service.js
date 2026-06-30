import {getUserByEmail} from "./users.service.js";

const llave="sesionActual"

export function createSession(user){
    localStorage.setItem(llave, JSON.stringify(user));
}

export function getSession(){
    const session = localStorage.getItem(llave);
    return session ? JSON.parse(session) : null;
}

export function clearSession(){
    localStorage.removeItem(llave);
}

export async function login(email, password){
    const user = await getUserByEmail(email);
    if (user?.password == password){
        createSession(user);
        return user;
    } else {
        alert("Credenciales incorrectas");
        throw new Error("Credenciales incorrectas");
    }
}