// Componente FollowButton
export function FollowButton() {
  const button = document.createElement("button");
  button.className =
    "bg-green-600 font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";
  button.textContent = "Seguir";

  let state = "follow";

  function updateState(newState) {
    state = newState;
    if (state === "follow") {
      button.className =
        "bg-green-600 font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";
      button.textContent = "Seguir";
    } else if (state === "following") {
      button.className =
        "bg-green-900 font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";
      button.textContent = "Siguiendo";
    }
  }

  // Click: alterna entre seguir y siguiendo
  button.addEventListener("click", () => {
    if (state === "follow") {
      updateState("following");
    } else if (state === "following") {
      // Si está en "Siguiendo" y se hace clic, vuelve a "Seguir"
      updateState("follow");
    }
  });

  // Hover: cuando está en "Siguiendo", mostrar "Dejar de seguir"
  button.addEventListener("mouseenter", () => {
    if (state === "following") {
      button.className =
        "bg-red-600 font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";
      button.textContent = "Dejar de seguir";
    }
  });

  // Al salir del hover, volver a "Siguiendo"
  button.addEventListener("mouseleave", () => {
    if (state === "following") {
      button.className =
        "bg-green-900 font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";
      button.textContent = "Siguiendo";
    }
  });

  return button;
}
