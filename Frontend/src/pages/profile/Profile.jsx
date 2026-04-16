import { Header } from "../../components/layout/Header";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Header title="Profile" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md">
          <div className="card flex items-center gap-4">
            <Avatar name={user?.name} size="lg" />
            <div>
              <h1 className="!text-xl">{user?.name}</h1>
              <p className="!text-sm">{user?.email}</p>
              <Badge variant={user?.userType === "admin" ? "blue" : "gray"} className="mt-1">
                {user?.userType}
              </Badge>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
