import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'sa',
  password: 'local123',
  database: 'NoGameDb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = async (sql: string, params: any[] = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function getRecentQuestionSet() {
    const quertStr = "select * from QuestionSet OrderBy LastUpdateUtc desc limit 1";
    return query(quertStr);
}