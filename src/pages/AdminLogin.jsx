import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../lib/api";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { access_token } = await adminApi.login(email, password);
      localStorage.setItem("admin_token", access_token);
      toast.success("Welcome back");
      nav("/admin");
    } catch (err) {
      toast.error("Login failed", { description: err?.response?.data?.detail || "Check credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-6 py-20" data-testid="admin-login-page">
      <div className="w-full max-w-md bg-white border border-[#D5D0C5] p-10">
        <div className="w-12 h-12 bg-[#1A3626] text-[#F4F1EA] grid place-items-center mb-6">
          <Lock className="w-5 h-5" />
        </div>
        <div className="eyebrow mb-2">Staff Only</div>
        <h1 className="font-serif-display text-3xl md:text-4xl text-[#1A3626] leading-tight">
          Admin Console
        </h1>
        <p className="text-sm text-[#4A524C] mt-2">Manage products and review inquiries.</p>

        <form onSubmit={submit} className="mt-8 space-y-5" data-testid="admin-login-form">
          <div>
            <label className="eyebrow block mb-2">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-[#1A3626]/20 bg-transparent py-2 focus:outline-none focus:border-[#1A3626]"
              data-testid="admin-email"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#1A3626]/20 bg-transparent py-2 focus:outline-none focus:border-[#1A3626]"
              data-testid="admin-password"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] disabled:opacity-60 px-6 py-3 text-sm font-medium transition-all"
            data-testid="admin-login-button"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
