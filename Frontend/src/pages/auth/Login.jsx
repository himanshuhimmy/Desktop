import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.userType === "admin" ? "/dashboard" : "/chat", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-headline text-3xl font-extrabold text-primary mb-1">Internal Access</h1>
      <p className="text-sm text-neutral-600 mb-8">Please authenticate using your assigned credentials.</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-tertiary/10 border border-tertiary/20">
          <p className="text-xs text-tertiary font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Identifier
          </label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Access Key
          </label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            required
          />
        </div>

        <Button type="submit" loading={loading} className="w-full mt-2 !py-3 !text-sm !font-semibold">
          Authorize Session →
        </Button>
      </form>

      <div className="mt-6 flex items-start gap-2 p-3 rounded-lg bg-tertiary/5 border border-tertiary/15">
        <span className="text-tertiary text-xs mt-0.5">⚠</span>
        <p className="text-[11px] text-tertiary/80 leading-relaxed">
          <span className="font-semibold text-tertiary">Legal Disclaimer: </span>
          Unauthorized access is strictly prohibited. All attempts are logged with IP and session metadata.
        </p>
      </div>
    </div>
  );
}
