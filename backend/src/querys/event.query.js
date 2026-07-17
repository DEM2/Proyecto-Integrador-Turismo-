import pool from "../config/db.js"

//Consulta para eventos

export async function getallevent() {
    const sql = `
     SELECT
            e.id,
            e.name,
            e.description,
            e.address,
            e.start_date,
            e.start_time,
            e.end_date,
            e.image_main,
            c.name AS category
        FROM events e
        INNER JOIN categories c
            ON c.id = e.id_category
        WHERE e.is_active = true
        ORDER BY e.start_date ASC
    `
    const result = await pool.query(sql);
    return result.rows
}

export async function getEventById(id_event) {

    const sql = `
    SELECT
        e.id,
        e.name,
        e.id_category,
        e.description,
        e.start_date,
        e.end_date,
        e.start_time,
        e.price,
        e.address,
        e.image_main,
        e.is_featured,
        c.name AS category_name
    FROM events e
    INNER JOIN categories c
        ON e.id_category = c.id
    WHERE e.id = $1;
`;
    const values = [
        id_event
    ]

    const result = await pool.query(sql, values);
    return result.rows[0] || null;

};

export async function getEventAgendaById(id_event) {

    const sql = `
        SELECT * FROM events_agenda
        WHERE id_event = $1;
    `
    const values = [
        id_event
    ]

    const result = await pool.query(sql, values);

    return result.rows || null
};


async function syncEventsSequence() {
    const sequenceResult = await pool.query(`
        SELECT pg_get_serial_sequence('events', 'id') AS sequence_name
    `);

    const sequenceName = sequenceResult.rows[0]?.sequence_name;

    if (!sequenceName) {
        return;
    }

    await pool.query(`
        SELECT setval(
            '${sequenceName}',
            COALESCE((SELECT MAX(id) FROM events), 0) + 1,
            false
        )
    `);
}

//Consulta para crear evento
// Se implementa consulta para la creación de eventos a partir de un evento 
// de tipo insertar.
export async function createEventByUser(eventData) {
    const sql = `
    INSERT INTO events(
        name,
        description,
        start_date,
        end_date,
        start_time,
        price,
        address,
        image_main,
        id_category,
        id_user
    ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10 
    )
    RETURNING *
    `;

    const values = [
        eventData.name,
        eventData.description,
        eventData.start_date,
        eventData.end_date,
        eventData.start_time,
        eventData.price,
        eventData.address,
        eventData.image_main,
        eventData.id_category,
        eventData.id_user
    ];

    try {
        const result = await pool.query(sql, values);
        return result.rows[0];
    } catch (error) {
        if (error?.code === "23505" && error?.constraint === "events_pkey") {
            await syncEventsSequence();
            const retryResult = await pool.query(sql, values);
            return retryResult.rows[0];
        }

        throw error;
    }
}

export async function createEventAgenda(idEvent, agenda) {
  const activitiesCreated = []

  for (const activity of agenda) {
    const title = typeof activity?.title === "string" ? activity.title.trim() : ""
    const activityDate = activity?.activity_date || null
    const activityTime = activity?.activity_time || null
    const isActive = activity?.is_active ?? true

    if (!title || !activityDate) {
      continue
    }

    const sql = `
      INSERT INTO events_agenda (
        id_event,
        activity_date,
        activity_time,
        title,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `

    const values = [
      idEvent,
      activityDate,
      activityTime,
      title,
      isActive
    ]

    const result = await pool.query(sql, values)

    activitiesCreated.push(result.rows[0])
  }

  return activitiesCreated
}