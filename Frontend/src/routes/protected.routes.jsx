import { Route, Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";

// admin pages
import Dashboard    from "../pages/admin/Dashboard";
import Users        from "../pages/admin/Users";
import Groups       from "../pages/admin/Groups";
import AdminSurveys from "../pages/admin/Surveys";

// chat
import ChatLayout from "../pages/chat/ChatLayout";
import GroupChat  from "../pages/chat/GroupChat";
import DMChat     from "../pages/chat/DMChat";

// shared
import UserSurveys from "../pages/survey/UserSurveys";
import Profile     from "../pages/profile/Profile";

// All routes that require the user to be logged in
const ProtectedRoutes = (
  <Route element={<AppLayout />}>
    <Route index element={<Navigate to="/chat" replace />} />

    {/* admin only */}
    <Route path="/dashboard"     element={<Dashboard />} />
    <Route path="/admin/users"   element={<Users />} />
    <Route path="/admin/groups"  element={<Groups />} />
    <Route path="/admin/surveys" element={<AdminSurveys />} />

    {/* shared (admin + user) */}
    <Route path="/surveys" element={<UserSurveys />} />
    <Route path="/profile" element={<Profile />} />

    {/* chat — nested so ChatLayout (conv list) stays mounted on navigation */}
    <Route path="/chat" element={<ChatLayout />}>
      <Route path="g/:conversationId" element={<GroupChat />} />
      <Route path="dm/:conversationId" element={<DMChat />} />
    </Route>
  </Route>
);

export default ProtectedRoutes;
