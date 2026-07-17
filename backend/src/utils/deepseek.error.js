// Este archivo convierte errores técnicos de DeepSeek
// en mensajes más entendibles para nuestro backend/frontend.

export function mapDeepSeekError(status) {
    const errors = {
        400: {
            code: "INVALID_FORMAT",
            message: "La solicitud enviada a la IA tiene un formato inválido."
        },
        401: {
            code: "AUTH_FAILED",
            message: "La API key de DeepSeek es inválida o no está configurada."
        },
        402: {
            code: "INSUFFICIENT_BALANCE",
            message: "La cuenta de DeepSeek no tiene saldo suficiente."
        },
        422: {
            code: "INVALID_PARAMETERS",
            message: "La solicitud tiene parámetros inválidos."
        },
        429: {
            code: "RATE_LIMIT",
            message: "Demasiadas solicitudes a la IA. Intenta en unos segundos."
        },
        500: {
            code: "DEEPSEEK_SERVER_ERROR",
            message: "DeepSeek tuvo un error interno."
        },
        503: {
            code: "DEEPSEEK_OVERLOADED",
            message: "DeepSeek está sobrecargado. Intenta de nuevo en unos segundos."
        }
    };

    return errors[status] || {
        code: "UNKNOWN_DEEPSEEK_ERROR",
        message: "Error desconocido al llamar a DeepSeek."
    };
}