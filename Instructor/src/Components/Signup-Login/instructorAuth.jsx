<<<<<<< HEAD
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import {supabase} from "../../supabaseClient.js";
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
=======
import { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { Button } from "../Signup-Login2/ui/button.jsx";
import Spline from "@splinetool/react-spline";
import { Input } from "../Signup-Login2/ui/input.jsx";
import { Label } from "../Signup-Login2/ui/label.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Signup-Login2/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Signup-Login2/ui/tabs.jsx";
import { Separator } from "../Signup-Login2/ui/separator.jsx";
import { Lock, User, BookOpen, Mail } from "lucide-react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

export const InstructorAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const username = mode === "signup" ? formData.get("username") : undefined;

    if (mode === "signup" && password !== confirmPassword) {
      setIsLoading(false);
      alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email, password }
          : { username, email, password };

      const res = await axios.post(`${API_BASE}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const data = res.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      alert(`✅ ${mode === "login" ? "Logged in" : "Registered"} successfully!`);
      window.location.href = "/dashboard";
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";
      alert(`❌ ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  const AuthForm = ({ mode }) => (
    <form onSubmit={(e) => handleSubmit(e, mode)} className="space-y-4">
      {/* Username field (only for signup) */}
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium">
            Username
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              name="username"
              placeholder="your_username"
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
            required
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
            required
          />
        </div>
      </div>

      {/* Confirm Password field (only for signup) */}
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-primary to-sky-800 hover:opacity-90 transition-all duration-300 shadow-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>{mode === "login" ? "Signing In..." : "Creating Account..."}</span>
          </div>
        ) : (
          <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
        )}
      </Button>

      {/* Google Login */}
      <div className="relative my-6">
  <Separator />
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
  </div>
  <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-2" type="button" onClick={handleGoogleLogin}>
    {/* Google SVG */}
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <g>
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.23 9.22 3.25l6.9-6.9C35.62 2.36 30.13 0 24 0 14.64 0 6.4 5.48 2.44 13.44l8.06 6.27C12.52 13.13 17.81 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.09 24.55c0-1.64-.15-3.22-.43-4.75H24v9.02h12.44c-.54 2.91-2.17 5.38-4.62 7.03l7.19 5.59C43.98 37.77 46.09 31.86 46.09 24.55z"/>
        <path fill="#FBBC05" d="M10.5 28.73c-1.02-2.98-1.02-6.18 0-9.16l-8.06-6.27C.81 17.41 0 20.61 0 24c0 3.39.81 6.59 2.44 9.44l8.06-6.27z"/>
        <path fill="#EA4335" d="M24 48c6.13 0 11.62-2.02 15.81-5.5l-7.19-5.59c-2.01 1.35-4.58 2.13-8.62 2.13-6.19 0-11.48-3.63-13.5-8.71l-8.06 6.27C6.4 42.52 14.64 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </g>
    </svg>
    Continue with Google
  </Button>
</div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4 relative">
      {/* Background spline */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/CX-vaL1eIVj5t5DY/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      {/* Foreground content */}
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16">
            <img
              src={logo}
              alt="ProLearnX Logo"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent text-white">
              ProLearnX
            </h1>
          </div>
        </div>
        {/* Auth Card */}
        <Card className="border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center space-x-2 text-primary">
              <BookOpen className="w-5 h-5" />
              <CardTitle className="text-xl">Welcome</CardTitle>
            </div>
            <CardDescription>
              Sign in to your instructor account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sky-800"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sky-800"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <AuthForm mode="login" />
              </TabsContent>
              <TabsContent value="signup" className="space-y-4">
                <AuthForm mode="signup" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

>>>>>>> fbb90a08faa6668b1784a81d16e5e328f93f5057
