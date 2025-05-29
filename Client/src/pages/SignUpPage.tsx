import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        name,
        email,
        mobile,
        password,
      });

      if (response.data) {
        toast.success("Account created successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="flex min-h-screen items-center justify-center bg-cinema-darker px-4 py-32">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-cinema-dark p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Create an Account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign up to get started with CineTicket
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="border-gray-700 bg-muted text-white placeholder-gray-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="email">Mobile No.</Label>
                <Input
                  id="mobile"
                  type="text"
                  placeholder="XXXXXXX789"
                  className="border-gray-700 bg-muted text-white placeholder-gray-400"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-700 bg-muted text-white placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-400">
                  Password must be at least 8 characters long
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-cinema-gold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-cinema-gold hover:underline">
                Privacy Policy
              </Link>
              .
            </div>

            <Button
              type="submit"
              className="w-full bg-cinema-red hover:bg-cinema-red/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative mt-6 flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-gray-700"></span>
            <span className="relative bg-cinema-dark px-4 text-sm text-gray-400">
              or sign up with
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
              Already have an account?{" "}
              <Link to="/signin" className="text-cinema-gold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
