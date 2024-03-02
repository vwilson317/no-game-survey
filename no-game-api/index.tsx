const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/api/questions', (req, res) => {
  console.log('[GET] request made')
  res.json([{
    key: 1,
      id: 1,
      text: "i'm a mock question from the server?"
    }]);
  //res.send('Hello I am a question?')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})