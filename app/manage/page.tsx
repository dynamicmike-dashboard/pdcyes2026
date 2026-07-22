"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ManageLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("logout") === "1") {
      fetch("/api/simple-auth?action=logout")
        .then(() => setStatusMsg("Logged out successfully."))
        .catch(() => {});
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/simple-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid password");
        setLoading(false);
        return;
      }

      const redirect = searchParams.get("redirect") || "/manage/events";
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">PDCYES Admin</h1>
          <p className="text-sm text-gray-500 mt-2">Enter management password to access events dashboard</p>
        </div>

        {statusMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
            {statusMsg}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
