import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

require("dotenv").config();

import express from "express";
const app: express.Express = express()
// const path = require('path');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

const port = process.env.PORT || 3000

app.get('/', async (req: express.Request, res: express.Response) => {
  res.send('<h1>Azure Managed Identities</h1><h2>Storage</h2><a href="/storage/">List</a>')
})

app.get('/storage/', async (req: express.Request, res: express.Response) => {
  const account = process.env.ACCOUNT_NAME
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  // Create a container
  const containerName = 'images';
  const containerClient = await blobServiceClient.getContainerClient(containerName);
  containerClient.createIfNotExists();

  let blobs: string = '';
  for await (const blob of containerClient.listBlobsFlat()) {
    blobs = blobs + `<li>${blob.name}</li>`;
  }
    
  res.send(`<h1>Storage list</h1><ul>${blobs}</ul>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
