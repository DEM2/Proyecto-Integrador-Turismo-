import pool from "../config/db.js";

export async function createPaymentTransaction({ id, amount, incomingPaymentId, quoteId }) {
  const sql = `
    INSERT INTO payment_transactions
      (id, status, amount, incoming_payment_id, quote_id)
    VALUES ($1, 'created', $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(sql, [id, amount, incomingPaymentId, quoteId]);
  return result.rows[0];
}

export async function updatePaymentTransaction(id, fields) {
  const sql = `
    UPDATE payment_transactions
    SET
      status = COALESCE($2, status),
      continue_access_token = COALESCE($3, continue_access_token),
      continue_uri = COALESCE($4, continue_uri),
      outgoing_payment_id = COALESCE($5, outgoing_payment_id),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(sql, [
    id,
    fields.status ?? null,
    fields.continueAccessToken ?? null,
    fields.continueUri ?? null,
    fields.outgoingPaymentId ?? null
  ]);
  return result.rows[0];
}

export async function getPaymentTransaction(id) {
  const sql = `SELECT * FROM payment_transactions WHERE id = $1;`;
  const result = await pool.query(sql, [id]);
  return result.rows[0] || null;
}