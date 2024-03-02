const mysql = require('mysql2/promise')

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'serviceAccount',
  password: 'local123',
  database: 'NoGameDb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function query(sql, params =[]){
  try{
    debugger
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, params);
    connection.release();
    return rows;
  } catch(err){
    console.log(err);
    // throw err;
  }
  // const [rows] = await pool.execute(sql, params);
  // return rows;
};

async function getRecentQuestionSet(){
    const quertStr = "select top(1) * from QuestionSet Order By LastUpdatedUtc desc";
    return query(quertStr);
};

module.exports = {getRecentQuestionSet}