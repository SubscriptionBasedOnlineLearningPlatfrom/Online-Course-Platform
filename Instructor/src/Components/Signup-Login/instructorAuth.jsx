import { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { Button } from "../Signup-Login2/ui/button.jsx";
import Spline from "@splinetool/react-spline";
import { Input } from "../Signup-Login2/ui/input.jsx";
import { Label } from "../Signup-Login2/ui/label.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Signup-Login2/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Signup-Login2/ui/tabs.jsx";
import { Separator } from "../Signup-Login2/ui/separator.jsx";
import { Mail, Lock, User, BookOpen } from "lucide-react";

const API_BASE = "http://localhost:5000";

export const InstructorAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const confirmPassword = formData.get("confirmPassword");

    if (mode === "signup" && password !== confirmPassword) {
      setIsLoading(false);
      alert("Passwords do not match");
      return;
    }

    try {
      // --- FIX IS HERE ---
      const endpoint = mode === "login" ? "/login" : "/register";
      const payload = mode === "login" ? { email, password } : { email, password, username };
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Auth failed");

      // Save token
      localStorage.setItem("token", data.token);
      alert(`✅ ${mode === "login" ? "Logged in" : "Registered"} successfully!`);
      // redirect to dashboard if needed
      window.location.href = "/dashboard";

    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect user to backend Google OAuth
    window.location.href = `${API_BASE}/auth/google`;
  };

  const AuthForm = ({ mode }) => (
    <form onSubmit={(e) => handleSubmit(e, mode)} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              name="username"
              placeholder="Dr. John Smith"
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
              required
            />
          </div>
        </div>
      )}

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
            placeholder="instructor@university.edu"
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
            required
          />
        </div>
      </div>

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

        <Button variant="outline" className="w-full mt-4" type="button" onClick={handleGoogleLogin}>
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
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
