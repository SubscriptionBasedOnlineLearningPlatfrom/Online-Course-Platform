import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import pool from "./Config/database.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({credentials: true}));
app.get("/", (req, res) => {
  res.send("Welcome to the server priya!");
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

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
