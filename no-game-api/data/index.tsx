const sqlServer = require('mssql')

// Create a connection pool
const config = {
  server: 'localhost',
  user: 'serviceAccount',
  password: 'local123',
  database: 'NoGameDb',
    // port: 1433,
  options: {
    // encrypt: true // Use this if you're on Windows Azure
    trustServerCertificate: true  
  }
}
let _pool;
sqlServer.connect(config).then((pool) => {
  if(pool.connecting) {
    console.log('Connecting to the database...');
  } else if (pool.connected) {
    console.log('Connected to the database.');
    _pool = pool; 
  }
}).catch(err => {
  console.error('Database connection failed!', err);
});

async function query(sql, params =[]){
  try{
    if(params.length == 0) {
      const results = await _pool.request().query(sql);
      return results.recordsets[0];
    } else {
      //todo: not fully implemented for mutiple or different value types
      const results = await _pool.request()
      .input('id', sqlServer.Int, 1)
      .query(sql, params);
      return results;
    }

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