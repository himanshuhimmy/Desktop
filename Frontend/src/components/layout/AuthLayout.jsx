import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PageSpinner } from "../ui/Spinner";

export function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen"><PageSpinner /></div>;
  if (user)    return <Navigate to={user.userType === "admin" ? "/dashboard" : "/chat"} replace />;

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — brand ───────────────────────────── */}
      <div className="hidden lg:flex w-[45%] bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* background texture circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-secondary/10" />

        {/* logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg font-headline">C</span>
            </div>
            <span className="text-white font-headline font-bold text-xl tracking-wide">CommApp</span>
          </div>
        </div>

        {/* headline */}
        <div className="relative z-10">
          <h1 className="!text-white text-4xl font-headline font-extrabold leading-tight mb-4">
            Secure Internal<br />Communications.
          </h1>
          <p className="!text-white/60 text-sm leading-relaxed max-w-xs">
            Proprietary workspace management and internal communications infrastructure for your team.
          </p>
          <div className="mt-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="!text-white/50 text-xs">End-to-end encrypted messaging</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="!text-white/50 text-xs">Role-based access control</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <p className="!text-white/50 text-xs">Real-time team collaboration</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-neutral px-8">
        <div className="w-full max-w-sm">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-primary font-headline font-bold text-lg">CommApp</span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
