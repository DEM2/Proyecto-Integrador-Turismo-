export const aiTools = [
    {
        type: "function",

        function: {
            name: "search_places",

            description: `
                Busca exclusivamente lugares físicos y restaurantes registrados en
                Barranquilla Explora.

                Utiliza esta herramienta para consultar sitios que una persona puede visitar,
                como museos, monumentos, plazas, espacios naturales, restaurantes, comercios
                y lugares de vida nocturna.

                NO utilices esta herramienta para buscar eventos, actividades programadas,
                festivales, conciertos, desfiles ni elementos que tengan fechas específicas.
                Para eso utiliza search_events.
                `.trim(),

            parameters: {
                type: "object",

                properties: {
                    search: {
                        type: "string",
                        description:
                            "Texto que se buscará en el nombre, descripción o dirección."
                    },

                    category: {
                        type: "string",

                        enum: [
                            "Lugares turísticos",
                            "Restaurantes",
                            "Cultura",
                            "Naturaleza",
                            "Compras",
                            "Vida nocturna"
                        ],

                        description:
                            "Categoría exacta registrada en Barranquilla Explora."
                    },

                    limit: {
                        type: "integer",
                        minimum: 1,
                        maximum: 10,
                        description:
                            "Cantidad máxima de resultados."
                    }
                },

                additionalProperties: false
            }
        }
    },


    {
        type: "function",

        function: {
            name: "search_events",

            description: `
                Busca exclusivamente eventos y actividades programadas registrados en
                Barranquilla Explora.

                DEBES utilizar esta herramienta cuando el usuario pregunte por:
                - Eventos registrados.
                - Próximos eventos.
                - Eventos de hoy.
                - Eventos de una fecha o rango de fechas.
                - Festivales, conciertos, desfiles y actividades programadas.
                - Fechas, horarios, precios o agendas de eventos.

                NO utilices search_places para responder preguntas sobre eventos.
                Si no se encuentran resultados, informa que no hay eventos coincidentes.
                No reemplaces los eventos solicitados por lugares.
                `.trim(),

            parameters: {
                type: "object",

                properties: {
                    search: {
                        type: "string",
                        description:
                            "Nombre, temática o término relacionado con el evento."
                    },

                    category: {
                        type: "string",
                        description:
                            "Nombre de la categoría del evento."
                    },

                    date_filter: {
                        type: "string",

                        enum: [
                            "today",
                            "started_today",
                            "upcoming",
                            "this_weekend",
                            "date_range",
                            "all"
                        ],

                        description: `
                            Periodo de búsqueda:
                            today = eventos programados para hoy.
                            started_today = eventos de hoy cuya hora de inicio ya pasó.
                            upcoming = eventos actuales o futuros.
                            this_weekend = eventos entre sábado y domingo.
                            date_range = eventos dentro de fechas concretas.
                            all = todos los eventos, incluso pasados.
                        `.trim()
                    },

                    date_from: {
                        type: "string",
                        description:
                            "Fecha inicial en formato YYYY-MM-DD. Se usa con date_range."
                    },

                    date_to: {
                        type: "string",
                        description:
                            "Fecha final en formato YYYY-MM-DD. Se usa con date_range."
                    },

                    free_only: {
                        type: "boolean",
                        description:
                            "Indica si solamente deben buscarse eventos gratuitos."
                    },

                    max_price: {
                        type: "number",
                        minimum: 0,
                        description:
                            "Presupuesto máximo indicado por el usuario."
                    },

                    limit: {
                        type: "integer",
                        minimum: 1,
                        maximum: 10,
                        description:
                            "Cantidad máxima de resultados."
                    }
                },

                additionalProperties: false
            }
        }
    },

    
    {
        type: "function",

        function: {
            name: "search_itineraries",

            description: `
                Busca itinerarios activos registrados en Barranquilla Explora,
                incluyendo sus lugares y eventos asociados.

                Utiliza esta herramienta cuando el usuario pregunte por:
                - Itinerarios disponibles.
                - Itinerarios activos hoy.
                - Planes para la próxima semana.
                - Rutas turísticas o culturales registradas.
                - Lugares y eventos incluidos en un itinerario.

                Esta herramienta consulta itinerarios existentes en la plataforma.
                No la utilices para crear un itinerario nuevo personalizado.
                Para crear uno nuevo, primero deben consultarse lugares y eventos
                según las preferencias del usuario.
            `.trim(),

            parameters: {
                type: "object",

                properties: {
                    search: {
                        type: "string",
                        description:
                            "Nombre o texto relacionado con el itinerario buscado."
                    },

                    date_filter: {
                        type: "string",

                        enum: [
                            "today",
                            "upcoming",
                            "next_week",
                            "date_range",
                            "all"
                        ],

                        description: `
                            Periodo de búsqueda:
                            - today: itinerarios activos en la fecha actual.
                            - upcoming: itinerarios activos o futuros.
                            - next_week: itinerarios programados entre los próximos 7 y 13 días.
                            - date_range: itinerarios dentro de fechas específicas.
                            - all: todos los itinerarios registrados, incluso históricos.
                        `.trim()
                    },

                    date_from: {
                        type: "string",
                        description:
                            "Fecha inicial en formato YYYY-MM-DD. Solo para date_range."
                    },

                    date_to: {
                        type: "string",
                        description:
                            "Fecha final en formato YYYY-MM-DD. Solo para date_range."
                    },

                    limit: {
                        type: "integer",
                        minimum: 1,
                        maximum: 10,
                        description:
                            "Cantidad máxima de itinerarios."
                    }
                },

                additionalProperties: false
            }
        }
    }
];