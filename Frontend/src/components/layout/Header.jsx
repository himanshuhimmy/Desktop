import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../ui/Avatar";

export function Header({ title, actions }) {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0">
      {/* search bar style — shows page title on left */}
      <div className="flex items-center gap-3">
        <h3 className="!text-sm !font-semibold !text-neutral-800">{title}</h3>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
          <Avatar name={user?.name} size="sm" />
          <span className="text-xs font-medium text-neutral-600 hidden sm:block">
            {user?.name?.split(" ")[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
