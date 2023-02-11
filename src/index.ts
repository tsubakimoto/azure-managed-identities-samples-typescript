import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const path = require('path');

require("dotenv").config();

import express from "express";
const app: express.Express = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const port = process.env.PORT || 3000

app.get('/', async (req: express.Request, res: express.Response) => {
  const account = process.env.ACCOUNT_NAME
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  // Create a container
  const containerName = 'images';
  const containerClient = await blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = containerClient.createIfNotExists();

  // console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  console.log("Blobs:");
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`- ${blob.name}`);
  }
    
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
