"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  // "request" = send reset link form; "update" = set new password form
  // (after /auth/callback exchanged the emailed code and we have a session)
  const [mode, setMode] = useState<"request" | "update">("request");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Request-link state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Set-new-password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    try {
      const supabase = createClient();

      supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          if (session) setMode("update");
        })
        .catch(() => {
          // Backend unreachable — stay in request mode
        })
        .finally(() => setIsCheckingSession(false));

      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY" || session) {
          setMode("update");
          setIsCheckingSession(false);
        }
      });
      subscription = data.subscription;
    } catch {
      setIsCheckingSession(false);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/reset-password`,
      });
      if (error) { setError(error.message); return; }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) { setError(error.message); return; }

      setUpdateSuccess(true);
      setTimeout(() => router.push("/admin"), 1500);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/bonardi-logo.webp"
              alt="Bonardi Construction"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <div className="text-xl font-bold text-white">Bonardi Construction</div>
              <div className="text-sm text-white/60">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          {isCheckingSession ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-[#FBB62E] animate-spin" />
            </div>
          ) : mode === "update" ? (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2">
                Set New Password
              </h1>
              <p className="text-white/60 text-center mb-8">
                Choose a new password for your account
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              {updateSuccess ? (
                <div className="text-center">
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Password updated! Redirecting...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword}>
                  {/* New Password */}
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FBB62E] focus:ring-1 focus:ring-[#FBB62E] transition-colors"
                        placeholder="At least 8 characters"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FBB62E] focus:ring-1 focus:ring-[#FBB62E] transition-colors"
                        placeholder="Re-enter your new password"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FBB62E] hover:bg-[#FBB62E]/90 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Set New Password"
                    )}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2">
                Reset Password
              </h1>
              <p className="text-white/60 text-center mb-8">
                Enter your email to receive a reset link
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center">
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Password reset link sent! Check your email.
                  </div>
                  <Link
                    href="/admin/login"
                    className="text-[#FBB62E] hover:text-[#FBB62E]/80 transition-colors"
                  >
                    Back to login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleResetPassword}>
                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FBB62E] focus:ring-1 focus:ring-[#FBB62E] transition-colors"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FBB62E] hover:bg-[#FBB62E]/90 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              )}

              {/* Back to login */}
              {!success && (
                <div className="mt-6 text-center">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-6">
          &copy; {new Date().getFullYear()} Bonardi Construction. All rights reserved.
        </p>
      </div>
    </div>
  );
}
