import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { adminService } from "../../services/admin.service";
import { conversationService } from "../../services/conversation.service";
import { surveyService } from "../../services/survey.service";
import { PageSpinner } from "../../components/ui/Spinner";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      adminService.getUsers(),
      conversationService.getAll(),
      surveyService.getAll(),
    ]).then(([usersRes, convsRes, surveysRes]) => {
      const users = usersRes.users;
      setStats({
        totalUsers:   users.length,
        activeUsers:  users.filter((u) => u.isActive).length,
        groups:       convsRes.conversations.filter((c) => c.isGroup).length,
        activeSurveys: surveysRes.surveys.filter((s) => s.isActive).length,
      });
    });
  }, []);

  if (!stats) return <><Header title="Dashboard" /><PageSpinner /></>;

  const cards = [
    { label: "Total Users",    value: stats.totalUsers },
    { label: "Active Users",   value: stats.activeUsers },
    { label: "Groups",         value: stats.groups },
    { label: "Active Surveys", value: stats.activeSurveys },
  ];

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="card flex flex-col gap-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{c.label}</p>
              <span className="text-3xl font-bold text-gray-900">{c.value}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
