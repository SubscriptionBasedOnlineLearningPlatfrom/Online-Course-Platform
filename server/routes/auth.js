import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
router.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase.from("instructors").select("*").limit(2);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// -------------------- PASSPORT STRATEGIES --------------------

// Local Strategy (login with email + password)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { data: user, error } = await supabase
          .from("instructors")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !user) return done(null, false, { message: "Invalid email" });

        const validPassword = await bcrypt.compare(password, user.password_hash);        if (!validPassword) return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT Strategy (protect routes)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const { data: user, error } = await supabase
          .from("instructors")
          .select("*")
          .eq("instructor_id", jwtPayload.id)
          .single();

        if (error || !user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// -------------------- ROUTES --------------------

// SIGNUP
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if exists
    const { data: existing } = await supabase
      .from("instructors")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const { data, error } = await supabase
      .from("instructors")
      .insert([{ username, email, password_hash: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    // create JWT
    const token = jwt.sign(
      { id: data.instructor_id, username: data.username, email: data.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signup successful", token });
  } catch (err) {
    console.error("Signup error:", err); // Add this line
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: info?.message || "Login failed" });

    // create JWT
    const token = jwt.sign(
      { id: user.instructor_id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  })(req, res, next);
});


// PROTECTED DASHBOARD
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, you are in dashboard!` });
  }
);

export default router;