import pool from "../config/db.js"


export async function countReviewsByUserOrganizador(id_user) {
    
    
  const sql = `
                SELECT COUNT(*) AS total_reviews
                FROM places_reviews
                INNER JOIN places
                    ON places_reviews.id_place = places.id
                WHERE places.id_user = $1;
;
    `;
  const values = [id_user];

  const result = await pool.query(sql, values);
  

  return result.rows || null;
}

export async function countSitesByUserOrganizador(id_user) {
    
    
  const sql = `
                SELECT count(*) AS total_sites
                from places
                inner join users on users.id=places.id_user
                where places.id_user=$1;
;
    `;
  const values = [id_user];

  const result = await pool.query(sql, values);
  

  return result.rows || null;
}

export async function countEventsByUserOrganizador(id_user) {
    
    
  const sql = `
                SELECT count(*) AS total_events
                from events
                inner join users on users.id=events.id_user
                where events.id_user=$1;
;
    `;
  const values = [id_user];

  const result = await pool.query(sql, values);
  

  return result.rows || null;
}

export async function getEventsByUserOrganizador(id_user) {
    
    
  const sql = `
                SELECT events.name,
                TO_CHAR(events.start_date, 'YYYY-MM-DD') as start_date,
                TO_CHAR(events.end_date, 'YYYY-MM-DD') as end_date,
                events.address,events.price
                from events
                inner join users on users.id=events.id_user
                where events.id_user=$1;
;
    `;
  const values = [id_user];

  const result = await pool.query(sql, values);
  

  return result.rows || null;
}