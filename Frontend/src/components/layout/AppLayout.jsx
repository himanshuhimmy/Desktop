import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from "./Sidebar";
import { PageSpinner } from "../ui/Spinner";
import { SurveyPrompt } from "../../pages/survey/SurveyPrompt";

export function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen"><PageSpinner /></div>;
  if (!user)   return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-neutral overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* SurveyPrompt here so it runs fresh every time the user lands in the app */}
        <SurveyPrompt key={user._id} />
        <Outlet />
      </div>
    </div>
  );
}
