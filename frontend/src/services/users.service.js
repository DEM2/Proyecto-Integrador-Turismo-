// Funcion para registrar un nuevo usuario

import { createSession } from "./auth.service";


export async function postUser(user) {
  
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al crear el usuario");
  }
  return await response.json();
}

// Funcion para obtener todos los usuarios
export async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users");
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  return await response.json();
}

// Funcion para obtener un usuario por su email
export async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:3000/api/users?userEmail=${email}`);
    if (!response.ok) {
        throw new Error("Error al obtener el usuario por email");
    }
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
    
}


//LOGIN

const URL = "http://localhost:3000"
const AUTH = `${URL}/api`

export async function loginUser(email, password) {
  const response = await fetch(`${AUTH}/login`,{
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
    throw new Error("Error al iniciar sección")
  }

  const sessionData = {
    user: data.data.user,
    //token: data.data.token,
  };

  return sessionData;
}


