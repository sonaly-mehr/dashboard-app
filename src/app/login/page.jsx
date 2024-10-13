"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error(`Login failed: ${error.message}`);
        } else {
          router.push("/dashboard");
          toast.success("Successfully logged in!");
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          toast.error(`Signup failed: ${error.message}`);
        } else {
          toast.success("Signup successful! Please log in.");
          setIsLogin(true); // Switch to login UI after successful signup
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* Email Input */}
        <input
          className="mb-4 border w-full py-2 px-3 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading} // Disable input during loading
        />

        {/* Password Input */}
        <input
          className="mb-4 border w-full py-2 px-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Disable input during loading
        />

        {/* Submit Button */}
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
        </button>

        {/* Toggle between Login and Signup */}
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 underline"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading} // Disable toggle during loading
            >
              {isLogin ? "Sign up here" : "Log in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <>
      <AuthForm />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
