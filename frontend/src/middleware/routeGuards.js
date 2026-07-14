export const authMiddleware = (session, route) => {
  if (route.needAuth && !session) {
    alert("Debes iniciar sesion para acceder a esta pagina");
    return { allowed: false, redirect: "/login" };
  }

  return { allowed: true };
};

export const guestMiddleware = (session, route) => {
  if (route.guestOnly && session) {
    alert("Ya has iniciado sesion");
    return { allowed: false, redirect: "/dashboard" };
  }

  return { allowed: true };
};

export const roleMiddleware = (session, route) => {
  if (!route.allowedRoles) {
    return { allowed: true };
  }

  const userRole = session?.user?.role || session?.role;

  if (!route.allowedRoles.includes(userRole)) {
    alert("No tienes permisos para acceder a esta pagina");
    return { allowed: false, redirect: "/" };
  }

  return { allowed: true };
};
