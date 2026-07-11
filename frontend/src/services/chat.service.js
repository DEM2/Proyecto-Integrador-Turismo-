export async function getMessageFromAi(message) {
  const response = await fetch("http://localhost:3000/api/ai/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({message}),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message || "Error al obtener la respuesta del chatbot",
    );
  }
  return await response.json();
}
