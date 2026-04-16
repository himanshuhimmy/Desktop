import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { surveyService } from "../../services/survey.service";
import { PageSpinner } from "../../components/ui/Spinner";
import { cn } from "../../utils/cn";

function SurveyForm({ survey, onDone }) {
  const [answers, setAnswers] = useState({});
  const [saving, setSaving]   = useState(false);

  const setAnswer    = (qi, val) => setAnswers((a) => ({ ...a, [qi]: val }));
  const toggleMulti  = (qi, opt) =>
    setAnswers((a) => {
      const cur = a[qi] || [];
      return { ...a, [qi]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt] };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formatted = Object.entries(answers).map(([qi, answer]) => ({ questionIndex: Number(qi), answer }));
    await surveyService.respond(survey._id, { answers: formatted });
    setSaving(false);
    onDone();
  };

  const handleSkip = async () => {
    setSaving(true);
    await surveyService.respond(survey._id, { skipped: true });
    setSaving(false);
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
      {survey.questions.map((q, i) => (
        <div key={i} className="flex flex-col gap-2 p-4 bg-neutral rounded-lg border border-neutral-200">
          <p className="text-sm font-semibold text-neutral-800">{i + 1}. {q.text}</p>
          {q.type === "text" && (
            <textarea className="input-base resize-none h-20" value={answers[i] || ""} onChange={(e) => setAnswer(i, e.target.value)} placeholder="Your answer…" />
          )}
          {q.type === "single" && q.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name={`q${i}`} checked={answers[i] === opt} onChange={() => setAnswer(i, opt)} />
              {opt}
            </label>
          ))}
          {q.type === "multiple" && q.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={(answers[i] || []).includes(opt)} onChange={() => toggleMulti(i, opt)} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" type="button" onClick={handleSkip} loading={saving}>Skip</Button>
        <Button type="submit" loading={saving}>Submit Survey</Button>
      </div>
    </form>
  );
}

function SurveyCard({ survey, response, onRefresh }) {
  const [expanded, setExpanded] = useState(false);

  const status = !response ? "pending"
    : response.skipped     ? "skipped"
    : "completed";

  const statusStyles = {
    pending:   { badge: "yellow", label: "Not taken" },
    skipped:   { badge: "gray",   label: "Skipped"   },
    completed: { badge: "green",  label: "Completed" },
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-800">{survey.title}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{survey.questions.length} questions</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={statusStyles[status].badge}>{statusStyles[status].label}</Badge>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            {expanded ? "Hide" : status === "pending" ? "Take Survey" : "View"}
          </button>
        </div>
      </div>

      {expanded && (
        <div>
          {/* pending — show fill form */}
          {status === "pending" && (
            <SurveyForm survey={survey} onDone={() => { setExpanded(false); onRefresh(); }} />
          )}

          {/* skipped — can now retake */}
          {status === "skipped" && (
            <SurveyForm survey={survey} onDone={() => { setExpanded(false); onRefresh(); }} />
          )}

          {/* completed — show questions + their answers */}
          {status === "completed" && (
            <div className="flex flex-col gap-3 mt-2">
              {survey.questions.map((q, i) => {
                const ans = response.answers.find((a) => a.questionIndex === i);
                return (
                  <div key={i} className="p-3 bg-neutral rounded-lg border border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-600 mb-1">{i + 1}. {q.text}</p>
                    <p className="text-sm text-neutral-800">
                      {Array.isArray(ans?.answer)
                        ? ans.answer.join(", ")
                        : ans?.answer || <span className="italic text-neutral-400">No answer</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function UserSurveys() {
  const [data, setData]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState("pending"); // "pending" | "completed"

  const load = () =>
    surveyService.getDashboard()
      .then((d) => setData(d.surveys))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  if (loading) return <><Header title="Surveys" /><PageSpinner /></>;

  // skipped = still actionable, so group with pending
  const pending   = data.filter((d) => !d.response || d.response?.skipped);
  const completed = data.filter((d) => d.response && !d.response?.skipped);

  const tabs = [
    { key: "pending",   label: `Pending (${pending.length})`    },
    { key: "completed", label: `History (${completed.length})`  },
  ];

  const items = tab === "pending" ? pending : completed;

  return (
    <>
      <Header title="Surveys" />
      <main className="flex-1 overflow-y-auto p-6 max-w-3xl">

        {/* tabs */}
        <div className="flex gap-1 mb-5 p-1 bg-neutral-100 rounded-lg w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-semibold transition-colors",
                tab === t.key ? "bg-white text-primary shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-neutral-400">
              {tab === "pending" ? "No pending surveys — you're all caught up!" : "No survey history yet."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(({ survey, response }) => (
              <SurveyCard key={survey._id} survey={survey} response={response} onRefresh={load} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
