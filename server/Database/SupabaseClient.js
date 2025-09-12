// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import { createClient } from "@supabase/supabase-js";

// const router = express.Router();

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// // -------------------- PASSPORT STRATEGIES --------------------

// // Local Strategy (login with username + password)
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       // get user from Supabase
//       const { data: user, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("username", username)
//         .single();

//       if (error || !user) return done(null, false, { message: "Invalid username" });

//       // check password
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) return done(null, false, { message: "Invalid password" });

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// // JWT Strategy (protect routes)
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: JWT_SECRET,
//     },
//     async (jwtPayload, done) => {
//       try {
//         // you can fetch user again if needed
//         const { data: user, error } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", jwtPayload.id)
//           .single();

//         if (error || !user) return done(null, false);

//         return done(null, user);
//       } catch (err) {
//         return done(err, false);
//       }
//     }
//   )
// );

// // -------------------- ROUTES --------------------

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // check if exists
//     const { data: existing } = await supabase
//       .from("users")
//       .select("*")
//       .eq("username", username)
//       .single();

//     if (existing) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // insert user
//     const { data, error } = await supabase
//       .from("users")
//       .insert([{ username, password: hashedPassword }])
//       .select()
//       .single();

//     if (error) throw error;

//     // create JWT
//     const token = jwt.sign({ id: data.id, username: data.username }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Signup successful", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGIN
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(400).json({ error: info?.message || "Login failed" });

//     // create JWT
//     const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   })(req, res, next);
// });

// // PROTECTED DASHBOARD
// router.get(
//   "/dashboard",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({ message: `Welcome ${req.user.username}, you are in dashboard!` });
//   }
// );

// export default router;

