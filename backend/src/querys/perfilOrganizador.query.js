import pool from "../config/db.js"

export async function getReviewsByUserOrganizador(id_user) {
    
    
  const sql = `
                select 
                places.name,
                users.name,
                places_reviews.comments,
                places_reviews.score,
                TO_CHAR(places_reviews.created_at, 'YYYY-MM-DD') as created_at
                from places
            inner join places_reviews on places_reviews.id_place= places.id
            inner join users on places_reviews.id_user = users.id
            where places.id_user=$1
            order by score
            limit 3
;
    `;
  const values = [id_user];

  const result = await pool.query(sql, values);
  

  return result.rows || null;
}

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