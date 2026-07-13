const llave="sesionActual"

export async function loginUser(email, password) {
  const response = await fetch(`http://localhost:3000/api/login`,{
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
  };

  return sessionData;
}

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
