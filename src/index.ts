const path = require('path');

import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
const app: express.Express = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const port = process.env.PORT || 3000

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
