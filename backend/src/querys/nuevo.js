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
