"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to dashboard on success
      router.push("/enquiries");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-700 shadow-lg mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-sage-950">Admin Access</h1>
          <p className="mt-1 text-sm text-neutralwarm-600">
            Mindful Living · Form Submissions Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-sage-100 bg-white p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-sage-900 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutralwarm-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-sage-200 bg-white text-sage-950 shadow-sm transition placeholder:text-neutralwarm-400 focus:border-softblue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutralwarm-400 hover:text-sage-700 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex min-h-12 items-center justify-center rounded-full bg-sage-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-800 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Login to Dashboard
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-neutralwarm-400">
          This area is restricted to authorised personnel only.
        </p>
      </div>
    </div>
  );
}
