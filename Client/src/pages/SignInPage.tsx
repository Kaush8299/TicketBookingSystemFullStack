import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        email,
        password,
      });

      if (response.data) {
        // Mock successful login
        localStorage.setItem("token", response.data.token);
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="flex min-h-screen items-center justify-center bg-cinema-darker px-4 py-32">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-cinema-dark p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border-gray-700 bg-muted text-white placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-cinema-gold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-700 bg-muted text-white placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-cinema-red hover:bg-cinema-red/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Button className="w-full bg-cinema-red hover:bg-cinema-red/90">
            <Link to="/signin_admin">LogIn as Admin</Link>
          </Button>

          <div className="relative mt-6 flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-gray-700"></span>
            <span className="relative bg-cinema-dark px-4 text-sm text-gray-400">
              or continue with
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-gray-700 bg-muted text-white hover:bg-gray-700"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 bg-muted text-white hover:bg-gray-700"
            >
              Facebook
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cinema-gold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
