export async function postUser(user) {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Error al crear el usuario");
  }
  return await response.json();
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  return await response.json();
}

export async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:3000/users?userEmail=${email}`);
    if (!response.ok) {
        throw new Error("Error al obtener el usuario por email");
    }
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
    
}
