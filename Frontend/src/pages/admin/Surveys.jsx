import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { surveyService } from "../../services/survey.service";
import { PageSpinner, Spinner } from "../../components/ui/Spinner";
import { cn } from "../../utils/cn";

const emptyQuestion = { text: "", type: "single", options: ["", ""] };

// ── Survey response detail panel ─────────────────────────────────────────────
function SurveyDetail({ survey, onClose, onReload }) {
  const [responses, setResponses] = useState(null);
  const [resetting, setResetting] = useState(null); // userId being reset

  useEffect(() => {
    surveyService.getResponses(survey._id).then((d) => setResponses(d.responses));
  }, [survey._id]);

  const handleReset = async (userId) => {
    setResetting(userId);
    await surveyService.resetUserResponse(survey._id, userId);
    // remove from local list
    setResponses((prev) => prev.filter((r) => r.userId._id !== userId));
    setResetting(null);
  };

  const filled  = responses?.filter((r) => !r.skipped) || [];
  const skipped = responses?.filter((r) => r.skipped)  || [];

  return (
    <Modal open onClose={onClose} title={survey.title} size="xl">
      <div className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto pr-1">

        {/* questions */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Questions</p>
          <div className="flex flex-col gap-2">
            {survey.questions.map((q, i) => (
              <div key={i} className="p-3 bg-neutral rounded-lg border border-neutral-100">
                <p className="text-sm font-semibold text-neutral-700">{i + 1}. {q.text}</p>
                <p className="text-xs text-neutral-400 mt-0.5 capitalize">{q.type} choice</p>
                {q.options?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {q.options.map((o) => o && <span key={o} className="text-xs bg-white border border-neutral-200 px-2 py-0.5 rounded">{o}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* responses */}
        {!responses ? (
          <div className="flex justify-center py-4"><Spinner /></div>
        ) : (
          <>
            {/* filled responses */}
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Completed ({filled.length})
              </p>
              {filled.length === 0 ? (
                <p className="text-sm text-neutral-400 italic">No one has completed this survey yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {filled.map((resp) => (
                    <div key={resp._id} className="border border-neutral-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar name={resp.userId.name} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-neutral-800">{resp.userId.name}</p>
                          <p className="text-xs text-neutral-400">{resp.userId.email}</p>
                        </div>
                        <Badge variant="green" className="ml-auto">Completed</Badge>
                      </div>
                      <div className="flex flex-col gap-2">
                        {survey.questions.map((q, i) => {
                          const ans = resp.answers.find((a) => a.questionIndex === i);
                          return (
                            <div key={i} className="flex flex-col gap-0.5">
                              <p className="text-xs text-neutral-500 font-medium">{q.text}</p>
                              <p className="text-sm text-neutral-800 bg-neutral px-2 py-1 rounded">
                                {Array.isArray(ans?.answer)
                                  ? ans.answer.join(", ")
                                  : ans?.answer || <span className="italic text-neutral-400">No answer</span>}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* skipped */}
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Skipped ({skipped.length})
              </p>
              {skipped.length === 0 ? (
                <p className="text-sm text-neutral-400 italic">No one has skipped this survey.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {skipped.map((resp) => (
                    <div key={resp._id} className="flex items-center gap-3 p-3 border border-neutral-100 rounded-lg">
                      <Avatar name={resp.userId.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-800">{resp.userId.name}</p>
                        <p className="text-xs text-neutral-400">{resp.userId.email}</p>
                      </div>
                      <Badge variant="gray">Skipped</Badge>
                      <Button
                        variant="secondary"
                        className="!py-1 !text-xs"
                        loading={resetting === resp.userId._id}
                        onClick={() => handleReset(resp.userId._id)}
                      >
                        Re-send popup
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── Main admin surveys page ───────────────────────────────────────────────────
export default function AdminSurveys() {
  const [surveys, setSurveys]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState(null); // survey to view detail
  const [title, setTitle]       = useState("");
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const [saving, setSaving]     = useState(false);

  const load = () => surveyService.getAll().then((d) => setSurveys(d.surveys)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const updateQ = (i, field, val) =>
    setQuestions((qs) => qs.map((q, idx) => idx === i ? { ...q, [field]: val } : q));

  const updateOption = (qi, oi, val) =>
    setQuestions((qs) => qs.map((q, idx) => idx === qi ? { ...q, options: q.options.map((o, j) => j === oi ? val : o) } : q));

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await surveyService.create({ title, questions });
      setShowCreate(false); setTitle(""); setQuestions([{ ...emptyQuestion }]);
      load();
    } finally { setSaving(false); }
  };

  if (loading) return <><Header title="Surveys" /><PageSpinner /></>;

  return (
    <>
      <Header title="Surveys" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setShowCreate(true)}>+ New Survey</Button>
        </div>

        <div className="flex flex-col gap-3">
          {surveys.map((s) => (
            <div key={s._id} className="card flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-800">{s.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{s.questions.length} questions</p>
              </div>
              <Badge variant={s.isActive ? "green" : "gray"}>{s.isActive ? "Active" : "Inactive"}</Badge>
              <Button
                variant="secondary"
                className="!py-1.5 !text-xs"
                onClick={() => setSelected(s)}
              >
                View Details
              </Button>
              <Button
                variant={s.isActive ? "outlined" : "secondary"}
                className="!py-1.5 !text-xs"
                onClick={async () => { await surveyService.toggleStatus(s._id); load(); }}
              >
                {s.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
          ))}

          {surveys.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-neutral-400">No surveys yet. Create one above.</p>
            </div>
          )}
        </div>
      </main>

      {/* survey detail / responses modal */}
      {selected && (
        <SurveyDetail
          survey={selected}
          onClose={() => setSelected(null)}
          onReload={load}
        />
      )}

      {/* create survey modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Survey" size="xl">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <Input label="Survey Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          {questions.map((q, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg p-3 flex flex-col gap-2">
              <Input label={`Question ${i + 1}`} value={q.text} onChange={(e) => updateQ(i, "text", e.target.value)} required />
              <div className="flex gap-3 items-center">
                <span className="text-xs text-neutral-500">Type:</span>
                {["single", "multiple", "text"].map((t) => (
                  <label key={t} className="flex items-center gap-1 text-xs cursor-pointer capitalize">
                    <input type="radio" checked={q.type === t} onChange={() => updateQ(i, "type", t)} /> {t}
                  </label>
                ))}
              </div>
              {q.type !== "text" && (
                <div className="flex flex-col gap-1">
                  {q.options.map((o, j) => (
                    <Input key={j} placeholder={`Option ${j + 1}`} value={o} onChange={(e) => updateOption(i, j, e.target.value)} />
                  ))}
                  <button type="button" className="text-xs text-primary text-left mt-1" onClick={() => updateQ(i, "options", [...q.options, ""])}>+ Add option</button>
                </div>
              )}
            </div>
          ))}
          <button type="button" className="text-sm text-primary font-semibold text-left" onClick={() => setQuestions((qs) => [...qs, { ...emptyQuestion }])}>+ Add Question</button>
          <div className="flex gap-2 justify-end sticky bottom-0 bg-white pt-2">
            <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Create Survey</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
