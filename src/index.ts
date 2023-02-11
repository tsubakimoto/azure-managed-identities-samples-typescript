import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
const app: express.Express = express()
const port = process.env.PORT || 3000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
