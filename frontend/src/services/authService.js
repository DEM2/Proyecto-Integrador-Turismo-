import { apiUrl } from "./apiConfig.js";

const llave="sesionActual"
const llave_perfil_organizador = "organizerProfileData";

export async function loginUser(email, password) {
  const response = await fetch(apiUrl("/api/login"),{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
  const data = await response.json();
  
  if(!response.ok){
    throw new Error(data?.message || "Error al iniciar sesion")
  }

  const sessionData = {
    user: data.data.user,
  };

  return sessionData;
}
//local storage
export function createSession(user){
    localStorage.setItem(llave, JSON.stringify(user));
}

export function getSession(){
    const session = localStorage.getItem(llave);
    return session ? JSON.parse(session) : null;
}

export function clearSession(){
    localStorage.removeItem(llave);
    sessionStorage.removeItem(llave_perfil_organizador);
}
//sesion storage
export function createSessionStorageData(data){
    sessionStorage.setItem(llave_perfil_organizador, JSON.stringify(data));
}

export function getSessionStorageData(){
    const storedData = sessionStorage.getItem(llave_perfil_organizador);

    if (!storedData) {
        return null;
    }

    try {
        return JSON.parse(storedData);
    } catch (error) {
        console.warn("No se pudo leer el dato guardado en sessionStorage:", error);
        return null;
    }
}
