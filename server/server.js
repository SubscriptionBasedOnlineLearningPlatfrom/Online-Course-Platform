import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./auth/authRoutes.js";
import instructorRoutes from "./Routers/instructorRoutes.js";
import passportConfig from "./auth/passportConfig.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true, // reflect request origin dynamically
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
// Preflight requests are handled by the global cors() middleware above (Express 5)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_me",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies
passportConfig(passport);

// Routes
app.get("/", (_req, res) => res.json({ message: "API running", routes: ["/auth", "/instructor"] }));
app.use("/auth", authRoutes);
app.use("/instructor", instructorRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Error handler for diagnostics
app.use((err, _req, res, _next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
