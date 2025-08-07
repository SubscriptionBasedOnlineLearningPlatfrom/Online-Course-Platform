import multer from 'multer';
import AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';


// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// DigitalOcean Spaces configuration
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION,
});

export  {s3, upload};