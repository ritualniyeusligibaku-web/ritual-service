"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "./login.schema";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { setAuthCookie } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    
    try {
      if (data.email === "admin@ritual-az.com" && data.password === "12345678") {
        // Set authentication cookie via server action
        await setAuthCookie();
        
        toast.success("Login successful!");
        
        // Redirect to admin page
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        toast.error("Invalid credentials. Please check your email and password.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark/95 to-primary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
            Ritual
          </h1>
          <p className="text-lg font-display text-primary-foreground/80">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground">
              Please sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <input
                id="username"
                type="email"
                {...register("email")}
                placeholder="admin@ritual-az.com"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {/* Error Message */}
            {errors.email && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">{errors.email.message}</p>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Error Message */}
            {errors.password && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">{errors.password.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground 
                       font-medium py-3 px-4 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              © 2025 Ritual Service. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
