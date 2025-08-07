import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import pool from "./Config/database.js";
// import courseRouter from "./Routers/CourseRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({credentials: true}));
app.get("/", (req, res) => {
  res.send("Welcome to the server priya!");
});




// routers
// app.use('/courses',courseRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});



// check database is successfully connected after checking remove these


// app.get("/users", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM users");
//     console.log(result.rows)
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Database error");
//   }
// });

// check digital ocean spaces work correctly

import { v4 as uuidv4 } from 'uuid';
import { s3, upload } from "./Config/Upload.js";
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  const params = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: `${uuidv4()}-${file.originalname}`, // Unique filename
    Body: file.buffer,
    ACL: 'public-read', // or private
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.json({ url: data.Location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading file' });
  }
});