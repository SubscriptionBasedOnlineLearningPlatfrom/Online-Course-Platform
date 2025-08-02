import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({credentials: true}));
app.get("/", (req, res) => {
  res.send("Welcome to the server priya!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
