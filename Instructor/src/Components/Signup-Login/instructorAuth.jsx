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
        <Button variant="outline" className="w-full mt-4" type="button" onClick={handleGoogleLogin}>
          {/* Google SVG here */}
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