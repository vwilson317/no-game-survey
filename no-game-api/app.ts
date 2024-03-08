import questionController from "./questionsController";
import questionSetController from "./questionSetsController";

const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors')
const port = 3000

app.use(cors())

app.use('/api', questionSetController);
app.use('/api', questionController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})