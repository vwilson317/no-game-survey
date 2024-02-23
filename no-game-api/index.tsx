const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/api/questions', (req, res) => {
  console.log('[GET] request made')
  res.send('Hello I am a question?')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})