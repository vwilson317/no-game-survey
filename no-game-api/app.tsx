const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors')
const port = 3000
const da = require('./data/dataAccess')

app.use(cors())

app.get('/api/questionsets', async (req, res) => {
  const queryObj = req.query;
  let questionSets;
  if (queryObj.recent === '') {
    questionSets = await da.getRecentQuestionSet();
    console.log('[GET] recent questionsets request made')

  } else {
    questionSets = await da.getAllQuestionSets();
    console.log('[GET] all questionsets request made')
  }

  res.json(questionSets);
})

app.get('/api/questionsets/:id', async (req, res) => {
  const id = req.params.id;
  const questionSet = await da.getQuestionSetById(id);
  console.log(`[GET] /questionsets/${id} request made`)
  res.json(questionSet);
})

app.post('/api/questionsets/:id/questions', async (req, res) => {
  const id = req.params.id;
  const question = req.body;//JSON.parse(req.body);
  const questionSet = await da.saveQuestion(id, question);
  console.log(`[POST] /questionsets/${id}/question request made`)
  res.json(questionSet);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})