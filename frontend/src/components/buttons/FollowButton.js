const FOLLOW_BUTTON_COLORS = {
  green: {
    default: "bg-green-500",
    active: "bg-green-900",
  },
  purple: {
    default: "bg-purple-500",
    active: "bg-purple-900",
  },
};

const BUTTON_BASE_CLASSES =
  "font-bold text-xs rounded-4xl px-3 py-1 transition cursor-pointer";

export function createFollowButton(color) {
  const selectedColor = FOLLOW_BUTTON_COLORS[color] || FOLLOW_BUTTON_COLORS.green;
  const button = document.createElement("button");
  let followState = "follow";

  function updateFollowState(nextState) {
    followState = nextState;

    if (followState === "follow") {
      button.className = `${selectedColor.default} ${BUTTON_BASE_CLASSES}`;
      button.textContent = "Seguir";
      return;
    }

    button.className = `${selectedColor.active} ${BUTTON_BASE_CLASSES}`;
    button.textContent = "Siguiendo";
  }

  updateFollowState(followState);

  button.addEventListener("click", () => {
    updateFollowState(followState === "follow" ? "following" : "follow");
  });

  button.addEventListener("mouseenter", () => {
    if (followState === "following") {
      button.className = `bg-red-500 ${BUTTON_BASE_CLASSES}`;
      button.textContent = "Dejar de seguir";
    }
  });

  button.addEventListener("mouseleave", () => {
    if (followState === "following") {
      updateFollowState("following");
    }
  });

  return button;
}
