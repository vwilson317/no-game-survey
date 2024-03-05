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
  let questions;
  if (queryObj.recent === '') {
    questions = await da.getRecentQuestionSet();
    console.log('[GET] recent questionsets request made')

  } else {
    questions = await da.getAllQuestionSets();
    console.log('[GET] all questionsets request made')
  }

  res.json(questions);
})

app.get('/api/questionsets/:id', (req, res) => {
  const id = req.params.id;
  console.log(`[GET] /questionsets/${id} request made`)
  res.json([{
    id: 1,
    text: "i'm a mock question from the server?"
  }]);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})