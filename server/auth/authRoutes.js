import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import {supabase} from "../Database/SupabaseClient.js";
import { generateToken } from "./tokenUtils.js";

const router = express.Router();

// Register (frontend expects /auth/register)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("instructors")
      .insert([{ full_name: name, email, password: hashedPassword }])
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

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // For SPAs, consider redirecting with a token, or set a cookie in production
    res.redirect("/dashboard");
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
