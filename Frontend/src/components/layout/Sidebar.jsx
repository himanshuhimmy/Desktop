import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../ui/Avatar";
import { cn } from "../../utils/cn";

const userLinks = [
  { to: "/chat",    label: "Messages", icon: "💬" },
  { to: "/surveys", label: "Surveys",  icon: "📋" },
  { to: "/profile", label: "Profile",  icon: "👤" },
];

const adminLinks = [
  { to: "/dashboard",     label: "Dashboard", icon: "⊞"  },
  { to: "/admin/users",   label: "Users",     icon: "👥" },
  { to: "/admin/groups",  label: "Groups",    icon: "🏢" },
  { to: "/admin/surveys", label: "Surveys",   icon: "📋" },
  { to: "/chat",          label: "Messages",  icon: "💬" },
  { to: "/profile",       label: "Profile",   icon: "👤" },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.userType === "admin" ? adminLinks : userLinks;

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <aside className="w-56 shrink-0 bg-primary flex flex-col h-screen">
      {/* logo */}
      <div className="px-5 pt-6 pb-4">
        <p className="font-headline text-base font-bold text-white tracking-wide">CommApp</p>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Internal Comms</p>
      </div>

      {/* divider */}
      <div className="mx-4 border-t border-white/10 mb-2" />

      {/* nav */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to + link.label}
            to={link.to}
            className={({ isActive }) =>
              cn("nav-item", isActive ? "nav-item-active" : "nav-item-inactive")
            }
          >
            <span className="text-base leading-none">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* user footer */}
      <div className="mx-4 border-t border-white/10 mb-1" />
      <div className="p-4 flex items-center gap-3">
        <Avatar name={user?.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
          <p className="text-[10px] text-white/40 capitalize">{user?.userType}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[10px] text-white/40 hover:text-tertiary-light transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
