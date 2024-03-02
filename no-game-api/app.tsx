const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const da = require('./data/index')

app.use(cors())

// get lastest question set (question set with the most recent update
// to a question in the collection)
app.get('/api/questions', async (req, res) => {
  const questions = await da.getRecentQuestionSet();
  console.log('[GET] questions request made')
  debugger
  res.json([{
      id: 1,
      text: "i'm a mock question from the server?"
    }]);
})

app.get('/api/questionsets/:id', (req, res) => {
  const id = req.params.id;
  console.log(`[GET] /questionsets/${id} request made`)
  res.json([{
      id: 1,
      text: "i'm a mock question from the server?"
    }]);
})

app.get('/api/questionsets', (req, res) => {
  console.log('[GET] questionsets request made')
  res.json([{
      id: 1,
      text: "i'm a mock question from the server?"
    }]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})