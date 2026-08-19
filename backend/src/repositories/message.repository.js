const pool = require("../database/database");

async function createMessage({
  trackingCode,
  title,
  message,
  status,
}) {
  const query = `
    INSERT INTO messages (
      tracking_code,
      title,
      message,
      status
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
      tracking_code,
      status,
      created_at
  `;

  const values = [
    trackingCode,
    title,
    message,
    status,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function findByTrackingCode(trackingCode) {
  const query = `
    SELECT
      tracking_code,
      status,
      created_at
    FROM messages
    WHERE tracking_code = $1
    LIMIT 1
  `;

  const result = await pool.query(query, [
    trackingCode,
  ]);

  return result.rows[0] || null;
}

module.exports = {
  createMessage,
  findByTrackingCode,
};
