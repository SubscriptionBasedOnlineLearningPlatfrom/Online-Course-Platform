import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { supabase } from "./Database/SupabaseClient.js";
import OverviewRouter from "./Routers/Instructor/OverviewRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({credentials: true}));

// Routes
app.use("/api/overview", OverviewRouter);



app.get("/", (req, res) => {
  res.send("Welcome to the server priya!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});


// Supabase setup
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
