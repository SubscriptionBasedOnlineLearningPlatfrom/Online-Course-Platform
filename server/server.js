import express from "express";
import passport from "passport";
import cors from "cors";

// import session from "express-session"; // optional if you use sessions, not needed for JWT only
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // the file I gave you earlier

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// -------------------- MIDDLEWARE --------------------
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form data

// Initialize Passport
app.use(passport.initialize());

// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
  res.send("✅ Server running. Go to /signup or /login");
});

app.use("/auth", authRoutes); // signup, login, dashboard

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
