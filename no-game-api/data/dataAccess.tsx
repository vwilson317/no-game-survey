import { QuestionSet } from "../models/questionSet";
import { Question } from "../models/question";

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
      //only support 1 Id parameter for now
      const results = await _pool.request()
      .input('id', sqlServer.BigInt, params[0])
      .query(sql, params);
      return results.recordsets[0];
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
    
    //this is business logic, so it should not be in the data access layer
    const results = await query(quertStr);
    const questionSet: QuestionSet = results[0];
    const questionQueryStr = `select * from Question where QuestionSetId = ${questionSet.Id}`;
    const questions = await query(questionQueryStr);
    questionSet.Questions = questions;
    return questionSet;
};

async function getAllQuestionSets(){
  const quertStr = "select * from QuestionSet Order By LastUpdatedUtc desc";
  const results = await query(quertStr);
  return results
  ;
}

async function getQuestionSetById(id: number){
  const quertStr = "select * from QuestionSet where Id = @id";
  const result = await query(quertStr, [id]);
  return result
  ;
}

module.exports = {getRecentQuestionSet, getAllQuestionSets, getQuestionSetById}