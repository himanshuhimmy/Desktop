import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { surveyService } from "../../services/survey.service";
import { useAuth } from "../../hooks/useAuth";

export function SurveyPrompt() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [open, setOpen]       = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    // admins never see survey popups
    if (!user || user.userType === "admin") return;
    surveyService.getPending().then((d) => {
      if (d.surveys.length > 0) { setSurveys(d.surveys); setOpen(true); }
    });
  }, [user]);

  const survey = surveys[current];

  const next = () => {
    if (current + 1 < surveys.length) { setCurrent((c) => c + 1); setAnswers({}); }
    else setOpen(false);
  };

  const handleSkip = async () => {
    setSaving(true);
    await surveyService.respond(survey._id, { skipped: true });
    setSaving(false);
    next();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formatted = Object.entries(answers).map(([qi, answer]) => ({ questionIndex: Number(qi), answer }));
    await surveyService.respond(survey._id, { answers: formatted });
    setSaving(false);
    next();
  };

  const setAnswer   = (qi, val) => setAnswers((a) => ({ ...a, [qi]: val }));
  const toggleMulti = (qi, opt) =>
    setAnswers((a) => {
      const cur = a[qi] || [];
      return { ...a, [qi]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt] };
    });

  if (!survey) return null;

  return (
    <Modal open={open} title={survey.title} size="lg">
      <p className="text-xs text-neutral-400 mb-4">Survey {current + 1} of {surveys.length}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-h-[60vh] overflow-y-auto pr-1">
        {survey.questions.map((q, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 bg-neutral rounded-lg">
            <p className="text-sm font-medium text-neutral-700">{i + 1}. {q.text}</p>
            {q.type === "text" && (
              <textarea className="input-base resize-none h-20" value={answers[i] || ""} onChange={(e) => setAnswer(i, e.target.value)} />
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
        <div className="flex gap-2 justify-end pt-2 sticky bottom-0 bg-white">
          <Button variant="secondary" type="button" onClick={handleSkip} loading={saving}>Skip for now</Button>
          <Button type="submit" loading={saving}>Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
