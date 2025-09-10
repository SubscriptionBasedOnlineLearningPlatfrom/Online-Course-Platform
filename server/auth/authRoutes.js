import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { supabase } from "../Database/SupabaseClient.js";
import { generateToken } from "./tokenUtils.js";
import { getAvailableUsername } from "../utils/userUtils.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  // 1. Rename 'username' from form to 'fullName' for clarity
  const { username: fullName, email, password } = req.body;
  try {
    // 2. Generate a unique username from the fullName
    const username = await getAvailableUsername(fullName);
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("instructors")
      .insert([
        {
          // 3. Save fullName and the generated username to the correct columns
          full_name: fullName,
          email,
          password: hashedPassword,
          username: username,
        },
      ])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    const token = generateToken(data);
    return res.status(201).json({ message: "Account created", user: data, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login via Passport local strategy
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      const token = generateToken(user);
      return res.json({ message: "Logged in", user, token });
    });
  })(req, res, next);
});

// Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback - Improved for SPAs
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`, // Redirect to frontend login on failure
    session: false, // We are using JWT, not sessions
  }),
  (req, res) => {
    // On success, generate a token and redirect to frontend with the token
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

// Logout
router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

export default router;