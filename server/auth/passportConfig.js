import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import { supabase } from "../Database/SupabaseClient.js";
import { getAvailableUsername } from "../utils/userUtils.js"; // Import from new location

export default function (passport) {
  // Local Strategy for Email/Password
  passport.use(
// ..
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let { data: users, error } = await supabase
            .from("instructors")
            .select("*")
            .eq("email", email)
            .single();

          if (error || !users) return done(null, false, { message: "User not found" });

          const isMatch = await bcrypt.compare(password, users.password);
          if (!isMatch) return done(null, false, { message: "Invalid credentials" });

          return done(null, users);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Google Strategy (conditionally enable if env vars are set)
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let { data: user, error } = await supabase
              .from("instructors")
              .select("*")
              .eq("google_id", profile.id)
              .single();

            // If user doesn't exist, create one (ensure username is provided)
            if (!user) {
              const email = profile.emails?.[0]?.value?.toLowerCase() ?? null;

              // Prefer email local-part; fallback to profile fields
              const desiredBase =
                (email ? email.split("@")[0] : null) ||
                profile.username ||
                profile.displayName ||
                "user";

              const username = await getAvailableUsername(desiredBase);

              let { data, error: insertError } = await supabase
                .from("instructors")
                .insert([
                  {
                    google_id: profile.id,
                    full_name: profile.displayName ?? null,
                    email,
                    username, // satisfy NOT NULL constraint
                  },
                ])
                .select()
                .single();

              if (insertError) return done(insertError, false);
              return done(null, data);
            }

            return done(null, user);
          } catch (err) {
            return done(err, false);
          }
        }
      )
    );
  } else {
    console.warn("Google OAuth not configured: missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET");
  }

  // Serialize / Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let { data: user, error } = await supabase
      .from("instructors")
      .select("*")
      .eq("id", id)
      .single();

    done(error, user);
  });
}